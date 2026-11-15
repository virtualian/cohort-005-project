import { describe, expect, it } from "vitest";
import {
  badgeLabel,
  clickNotification,
  parseFeedNotification,
  unreadAmong,
} from "./notification-feed";

const unread = { id: "n1", readAt: null };
const read = { id: "n2", readAt: "2026-10-01T10:00:00.000Z" };

describe("unreadAmong", () => {
  const loaded = [unread, read, { id: "n3", readAt: null }];

  it("keeps only the asked-for Notifications that are still unread", () => {
    expect(unreadAmong(loaded, ["n1", "n2", "n3"])).toEqual(["n1", "n3"]);
  });

  it("is empty when everything asked for is already read", () => {
    expect(unreadAmong(loaded, ["n2"])).toEqual([]);
  });

  it("is empty when nothing is asked for, or the ids aren't loaded", () => {
    expect(unreadAmong(loaded, [])).toEqual([]);
    expect(unreadAmong(loaded, ["gone"])).toEqual([]);
  });
});

describe("clickNotification", () => {
  it("marks an unread Notification read and goes to its click target", () => {
    expect(clickNotification(unread, "/courses/a/lessons/1")).toEqual({
      markRead: ["n1"],
      navigateTo: "/courses/a/lessons/1",
    });
  });

  it("only navigates when the Notification is already read", () => {
    expect(clickNotification(read, "/courses/a/lessons/1")).toEqual({
      markRead: [],
      navigateTo: "/courses/a/lessons/1",
    });
  });

  it("only marks read when there is nowhere to go", () => {
    expect(clickNotification(unread, undefined)).toEqual({
      markRead: ["n1"],
      navigateTo: null,
    });
    expect(clickNotification(unread, "")).toEqual({
      markRead: ["n1"],
      navigateTo: null,
    });
  });
});

describe("badgeLabel", () => {
  it("shows nothing when nothing is unseen", () => {
    expect(badgeLabel(0)).toBeNull();
  });

  it("shows the count up to nine", () => {
    expect(badgeLabel(1)).toBe("1");
    expect(badgeLabel(9)).toBe("9");
  });

  it("caps at 9+ above nine", () => {
    expect(badgeLabel(10)).toBe("9+");
    expect(badgeLabel(250)).toBe("9+");
  });
});

describe("parseFeedNotification", () => {
  const envelope = {
    id: "n1",
    actor: { name: "Ben", avatarUrl: null },
    insertedAt: "2026-10-01T10:00:00.000Z",
    readAt: null,
    seenAt: null,
  };

  it("reads a Seat claimed entry", () => {
    const data = {
      seatId: 7,
      courseId: 3,
      courseTitle: "Test Course",
      seatsLeft: 2,
      url: "/team",
    };

    expect(
      parseFeedNotification({ ...envelope, kind: "seat-claimed", data })
    ).toEqual({ ...envelope, kind: "seat-claimed", data });
  });

  it("reads a Refund Request confirmation, which has no actor or url", () => {
    const data = {
      refundRequestId: 4,
      courseTitle: "Test Course",
      amount: "$79.00",
    };

    expect(
      parseFeedNotification({
        ...envelope,
        actor: null,
        kind: "refund-requested",
        data,
      })
    ).toEqual({ ...envelope, actor: null, kind: "refund-requested", data });
  });

  it("drops an entry of a kind Cadence doesn't know", () => {
    expect(
      parseFeedNotification({ ...envelope, kind: "badge-earned", data: {} })
    ).toBeNull();
  });

  it("drops an entry whose data doesn't match its kind", () => {
    expect(
      parseFeedNotification({
        ...envelope,
        kind: "seat-claimed",
        data: { seatId: 7, courseTitle: "Test Course" },
      })
    ).toBeNull();
  });
});
