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




// get the top N words from text with 1 + partial pass
    // 1) build frequency map in one pass 
    // 2) select top N with a small list (fixes repeated full sort)
export function getTopWords(  rawText: string,  topLimit: number,  ): { topWords: TopWord[];  totalWords: number; uniqueWords: number } {
    const tokens = tokenizeText(rawText);

    // frequency map (count for each uniquw token)  -->  key-value pairs (similar to dictionaries in other languages)
    const countMap = new Map<string, number>();

    // pass 1  -->  count everything
    for (const token of tokens)  countMap.set(token, (countMap.get(token) ?? 0) + 1);

    // pass 2  -->  extract top N without sorting all unique words ; capped at <= 12
    const topList: TopWord[] = [];

    for (const [word, count] of countMap.entries()) {
        // still filling topList ?  -->  just push
        if (topList.length < topLimit) {
            topList.push({ word, count });
            continue;
        }

        // find the smallest item currently in topList
        let minIndex = 0;
        for (let i = 1; i < topList.length; i += 1) {
            if (topList[i].count < topList[minIndex].count) {
                minIndex = i;
            }
        }

        // replace smallest only if this word beats it
        if (count > topList[minIndex].count) {
            topList[minIndex] = { word, count };
        }
    }

    // final ordering  -->  only sort the tiny topList (not all unique words)
    topList.sort((a, b) => b.count - a.count);

    return {
        topWords: topList,
        totalWords: tokens.length,
        uniqueWords: countMap.size,
    };
}
