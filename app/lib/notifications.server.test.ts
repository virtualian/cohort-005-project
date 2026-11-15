import { afterEach, describe, expect, it, vi } from "vitest";
import { sendSafely, type Notification } from "./notifications.server";
import {
  fakeNotifications,
  type FakeNotifications,
} from "./notifications.fake.server";

const recipient = {
  id: 1,
  name: "Tess Admin",
  email: "tess@example.com",
  avatarUrl: null,
};

const seatClaimed: Notification = {
  kind: "seat-claimed",
  recipient,
  data: {
    seatId: 7,
    courseId: 3,
    courseTitle: "Test Course",
    seatsLeft: 2,
    url: "/team",
  },
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("sendSafely", () => {
  let notifications: FakeNotifications;

  it("sends a Notification whose data matches its kind", async () => {
    notifications = fakeNotifications();

    await sendSafely(notifications, seatClaimed, "seat-claimed:7");

    expect(notifications.sent).toEqual([
      { ...seatClaimed, idempotencyKey: "seat-claimed:7" },
    ]);
  });

  it("logs and does not send a Notification whose data doesn't match its kind", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    notifications = fakeNotifications();
    const invalid = {
      ...seatClaimed,
      data: { ...seatClaimed.data, seatsLeft: "two" },
    } as unknown as Notification;

    await expect(
      sendSafely(notifications, invalid, "seat-claimed:7")
    ).resolves.toBeUndefined();

    expect(notifications.sent).toEqual([]);
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("seat-claimed:7"),
      expect.stringContaining("seatsLeft")
    );
  });
});
