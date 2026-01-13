/* ================================
  TL;DR  -->  pure functions used by controllers

      - normalize text into words + top words extraction
      - build top words  -->  counts + top selection in one pass
================================ */


import type { TopWord } from "../types";


// words we want to ignore for importance signals
const stopWords = new Set<string>([
    "a", "an", "the", "and", "or", "but",
    "i", "you", "he", "she", "it", "we", "they",
    "me", "my", "your", "our", "their",
    "to", "of", "in", "on", "for", "with", "at", "by", "from",
    "is", "are", "was", "were", "be", "been", "being",
    "this", "that", "these", "those",
    "as", "not", "if", "then", "than",
]);




// normalize raw text into tokens we can count
function tokenizeText(rawText: string): string[] {

    const lower = rawText.toLowerCase();  // lowercase to merge "Budget" and "budget"

    const cleaned = lower.replace(/[^a-z0-9\s]/g, " ");  // replace most punctuation with spaces so words split cleanly

    const collapsed = cleaned.replace(/\s+/g, " ").trim();  // collapse repeated whitespace into single spaces
    if (collapsed.length === 0)  return [];

    const tokens = collapsed.split(" ");  // split into tokens

    // filter out stop words + tiny tokens (like single letters)
    return tokens.filter((token) => {
        if (token.length <= 1) return false;
        if (stopWords.has(token)) return false;
        return true;
    });
}




// get the top N words from text, with a single pass over tokens
export function getTopWords( rawText: string,  topLimit: number ):  { topWords: TopWord[]; totalWords: number; uniqueWords: number }  {
    const tokens = tokenizeText(rawText);

    const countMap = new Map<string, number>();  // frequency map for counts

    let topList: TopWord[] = [];  // maintain a small list of candidates as we count

    for (const token of tokens) {
        const nextCount = (countMap.get(token) ?? 0) + 1;
        countMap.set(token, nextCount);

        // update top list in-place  -->  if token exists, update its count  ;  else, maybe insert it
        const existingIndex = topList.findIndex((item) => item.word === token);

        if (existingIndex !== -1) {
            topList[existingIndex] = { word: token, count: nextCount };
        } else {
            // only add if we still have room  OR  it can beat the smallest item
            if (topList.length < topLimit) {
                topList.push({ word: token, count: nextCount });
            } else {
                // find current minimum in topList
                let minIndex = 0;
                for (let i = 1; i < topList.length; i += 1) {
                    if (topList[i].count < topList[minIndex].count) {
                        minIndex = i;
                    }
                }

                // if this token beats the smallest entry, replace it
                if (nextCount > topList[minIndex].count) {
                    topList[minIndex] = { word: token, count: nextCount };
                }
            }
        }

        // keep it sorted descending so frontend gets stable output ordering
        topList = topList.sort((a, b) => b.count - a.count).slice(0, topLimit);
    }

    return {
        topWords: topList,
        totalWords: tokens.length,
        uniqueWords: countMap.size,
    };
}
