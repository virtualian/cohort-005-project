/**
 * Whether completing a Lesson should record Course Completion on the
 * Enrollment now.
 *
 * Course Completion is recorded once, when every Lesson in the Course is
 * completed, and then stands: a recorded value is never replaced, even when
 * Lessons are added later or the last Lesson is completed again. A Course
 * with no Lessons cannot be completed.
 */
export function shouldRecordCourseCompletion({
  existingCompletedAt,
  totalLessons,
  completedLessons,
}: {
  existingCompletedAt: string | null;
  totalLessons: number;
  completedLessons: number;
}): boolean {
  if (existingCompletedAt !== null) return false;
  return totalLessons > 0 && completedLessons >= totalLessons;
}
