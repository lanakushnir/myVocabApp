
export class List {
  date: string
  words: Word[]
}
export class Word {
  id: string
  text: string
  needsToBeReviewed: number
  pronunciations: Pronunciation[]
  entries: Entry[]
}
export class Pronunciation {
  id: string
  audioFile: string
  phoneticSpelling: string
}
export class Entry {
  id: string
  lexicalCategory: string
  etymologies: string[]
  senses: Sense[]
}
export class Sense {
  id: string
  definition: string
  example: string
}
