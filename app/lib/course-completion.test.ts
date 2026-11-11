import { describe, it, expect } from "vitest";
import { shouldRecordCourseCompletion } from "./course-completion";

describe("shouldRecordCourseCompletion", () => {
  it("records Course Completion when the last remaining Lesson is completed", () => {
    expect(
      shouldRecordCourseCompletion({
        existingCompletedAt: null,
        totalLessons: 5,
        completedLessons: 5,
      })
    ).toBe(true);
  });

  it("does not record it while Lessons remain", () => {
    expect(
      shouldRecordCourseCompletion({
        existingCompletedAt: null,
        totalLessons: 5,
        completedLessons: 4,
      })
    ).toBe(false);
  });

  it("leaves an existing Course Completion alone after a Lesson is added", () => {
    // The Course grew from 5 to 6 Lessons after the Student completed it. The
    // recorded Course Completion stands; nothing here may overwrite it.
    expect(
      shouldRecordCourseCompletion({
        existingCompletedAt: "2026-01-01T00:00:00.000Z",
        totalLessons: 6,
        completedLessons: 5,
      })
    ).toBe(false);
  });

  it("does not re-record when the last Lesson is completed again", () => {
    expect(
      shouldRecordCourseCompletion({
        existingCompletedAt: "2026-01-01T00:00:00.000Z",
        totalLessons: 5,
        completedLessons: 5,
      })
    ).toBe(false);
  });

  it("does not record it for a Course with no Lessons", () => {
    expect(
      shouldRecordCourseCompletion({
        existingCompletedAt: null,
        totalLessons: 0,
        completedLessons: 0,
      })
    ).toBe(false);
  });
});
