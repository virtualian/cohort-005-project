/**
 * Whether an Attempt's Score meets its Quiz's Passing Score. Both are
 * fractions from 0 to 1. A Score equal to the Passing Score passes.
 */
export function isPassingScore(score: number, passingScore: number): boolean {
  return score >= passingScore;
}
