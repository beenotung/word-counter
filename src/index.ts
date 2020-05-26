export let wordRegex = require('word-regex')()

export class WordCounter {
  wordCounts = new Map<string, number>()

  splitWords(string: string): string[] {
    return string.match(wordRegex) || []
  }

  addString(string: string) {
    for (const word of this.splitWords(string)) {
      let count = this.wordCounts.get(word) || 0
      count++
      this.wordCounts.set(word, count)
    }
  }

  collapseWord(word: string): string {
    return word.toLocaleLowerCase()
  }

  collapse() {
    for (let [word, count] of this.wordCounts) {
      const lower = this.collapseWord(word)
      if (word === lower || !this.wordCounts.has(lower)) {
        continue
      }
      count += this.wordCounts.get(lower)!
      this.wordCounts.set(lower, count)
      this.wordCounts.delete(word)
    }
  }

  export() {
    return Array.from(this.wordCounts).map(([word, count]) => ({ word, count }))
  }

  reset() {
    this.wordCounts.clear()
  }
}
