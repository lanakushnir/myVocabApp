import { Component, OnInit } from '@angular/core'
import { Router }            from '@angular/router'
import { WordService }       from '../word.service'
import { Word }              from '../word'

@Component({
  moduleId: module.id,
  selector: 'word-new',
  templateUrl: './word-new.component.html',
})
export class WordNewComponent {
  isErrorMessage: boolean = false
  wordToApi: string = null
  errorReason: any
  word: Word

  constructor(private wordService: WordService, private router: Router) {}

  saveWord(text: string) {
    this.isErrorMessage = false
    this.wordToApi = text
    this.errorReason = null
    this.word = null
    if (!text.trim()) return
    this.wordService.saveWord(text)
                    .subscribe((json: any) => this.displayWord(json),
                               (error: any) => this.displayError(error))
  }

  displayWord(json: any) {
    if (json.does_exist) {
      this.errorReason = {wordExist: json.does_exist}
      this.displayError() }
    this.word = json
  }

  displayError(error?: any) {
    this.isErrorMessage = true
  }
  
  getErrorMessage() {
    var message = ""
    var errorMessage = {
      default: "<p>Sorry, couldn't find word '" + this.wordToApi + "'. Would you like to <a href='/add'>create it</a>?</p>",
      wordExist: "<p>Word '" + this.wordToApi + "' was already added before. Moving to <a href='/list'>Today</a> list.</p>"
    }
    if (this.errorReason) { message = errorMessage[ String(Object.keys(this.errorReason)[0]) ] }
    else { message = errorMessage["default"] }

    return message
  }

}
