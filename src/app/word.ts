
export class List {
  date: string
  words: Word[]
}
export class Word {
  id: string
  text: string
  lexicalCategory: string
  pronunciations: Pronunciation[]
  senses: Sense[]
  etymologies: string[]
  needsToBeReviewed: number
}
export class Pronunciation {
  phoneticSpelling: string
  audioFile: string
  id: string
}
export class Sense {
  id: string
  definition: string
  example: string
}
