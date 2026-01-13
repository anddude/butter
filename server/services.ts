/* ================================
    TL;DR  -->  pure functions used by controllers
        - normalize text into words
        - build top words (counts + top selection in one pass)
================================ */

import type { WordCount } from '../types.ts';




// common words to ignore as keywords
// note: this list is intentionally small for mvp  -->  we can expand later if needed
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
    // lowercase so comparisons and stopword checks are consistent
    const lowerText = rawText.toLowerCase();

    // replace non-word punctuation with spaces
    // keep letters, numbers, apostrophes, and whitespace
    const cleanedText = lowerText.replace(/[^a-z0-9'\s]/g, ' ');

    // split on whitespace and remove empty strings
    const roughWords = cleanedText.split(/\s+/g).filter(Boolean);

    // filter out stopwords and very short tokens
    const filteredWords = roughWords.filter((word) => {
        if (word.length < 2) return false;
        if (stopWords.has(word)) return false;
        return true;
    });

    return filteredWords;
    };




    /* ---------- top words (count + select in one pass) ---------- */

    export const buildTopWords = (words: string[], topLimit: number = 3): WordCount[] => {
        // map constructor  -->  like a set but for key-value pairs (think dictionaries in other languages)
        
    const countMap = new Map<string, number>();

    // array of top words (kept small)  -->  we keep it sorted by count desc
    const topList: WordCount[] = [];

    // helper  -->  update or insert a word inside the top list (works better when top limit is small)
    const upsertTop = (word: string, count: number) => {
        // check if the word is already in topList
        const foundIndex = topList.findIndex((item) => item.word === word);

        if (foundIndex !== -1) {
        // update existing count
        topList[foundIndex].count = count;
        } else {
        // not in list yet  -->  only insert if we have space or it beats the smallest
        if (topList.length < topLimit) {
            topList.push({ word, count });
        } else {
            // list is full  -->  compare against the last item (smallest after sort)
            const last = topList[topList.length - 1];
            if (count > last.count) {
            topList.push({ word, count });
            } else {
            return; // no need to update list
            }
        }
        }

        // keep list sorted by count desc, then by word for stability
        topList.sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.word.localeCompare(b.word);
        });

        // trim to topLimit in case we added extra
        if (topList.length > topLimit) {
        topList.length = topLimit;
        }
    };

    // single pass over words  -->  update the map and top list at the same time
    for (const word of words) {
        const nextCount = (countMap.get(word) ?? 0) + 1;
        countMap.set(word, nextCount);

        // keep top list in sync with the updated count
        upsertTop(word, nextCount);
    }

    return topList;
    };
