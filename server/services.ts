/* ================================
  TL;DR  -->   pure functions used by controllers
================================ */


import type { WordCount } from '../types.ts';


// common words to ignore as keywords
const stopWords = new Set<string>([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'else', 'so',
  'to', 'of', 'in', 'on', 'for', 'with', 'as', 'at', 'by', 'from',
  'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'hers', 'our', 'their',
  'this', 'that', 'these', 'those',
  'not', 'no', 'yes',
]);




/* ---------- text cleaning ---------- */

export const normalizeText = (rawText: string): string[] => {
  const lowerText = rawText.toLowerCase();  // keep comparisons consistent

  const cleanedText = lowerText.replace(/[^a-z0-9'\s]/g, ' ');  // keep letters/numbers/apostrophes  -->  replace punctuation with spaces

  const roughWords = cleanedText.split(/\s+/g).filter(Boolean);  // split on whitespace

  // filter out stopwords
  const filteredWords = roughWords.filter((word) => {
    if (word.length < 2) return false;
    if (stopWords.has(word)) return false;
    return true;
  });

  return filteredWords;
};



/* ---------- frequency counting ---------- */

export const countWordFrequency = (words: string[]): Map<string, number> => {
  const frequencyMap = new Map<string, number>();

  for (const word of words) {
    const prevCount = frequencyMap.get(word) ?? 0;
    frequencyMap.set(word, prevCount + 1);
  }

  return frequencyMap;
};

export const getTopWords = (frequencyMap: Map<string, number>, topLimit: number): WordCount[] => {
  const wordCounts: WordCount[] = [];

  for (const [word, count] of frequencyMap.entries()) {
    wordCounts.push({ word, count });
  }

  wordCounts.sort((a, b) => b.count - a.count);

  return wordCounts.slice(0, topLimit);
};
