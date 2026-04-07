// @ts-ignore
import Filter from 'bad-words';

const filter = new Filter();

export async function evaluateComment(message: string): Promise<{ isClean: boolean; score: number | null }> {
  // 1. Fast heuristic: bad-words list
  if (filter.isProfane(message)) {
    return { isClean: false, score: 1.0 }; // Force rejection
  }

  // Set all comments to pending status by default
  return { isClean: true, score: null };
}
