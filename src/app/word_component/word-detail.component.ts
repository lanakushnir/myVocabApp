import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params }                 from '@angular/router'
import { WordService }                                    from '../word.service'
import { Word }                                           from '../word'

@Component({
  moduleId: module.id,
  selector: 'word-detail',
  templateUrl: './word-detail.component.html'
})
export class WordDetailComponent implements OnInit {
  @Input() isBrief: boolean
  @Input() word: Word
  @Output() wordToEdit = new EventEmitter<Word>()
  param = this.route.snapshot.params['text']
  errorMessage: string
  audioEl: any
  isPlaying: boolean = false

  constructor (private wordService: WordService,
               private router: Router,
               private route: ActivatedRoute) {}

  ngOnInit() {
    if (!this.word) { this.getWord() }
  }

  getWord() {
    this.wordService.getWord(this.param)
                    .subscribe((word: Word) => this.word = word,
                              (error: any) =>  this.errorMessage = <any>error)
  }

  playAudio() {
    if (!this.audioEl) {
      this.audioEl = document.getElementById("audio")
    }
    if (!this.isPlaying) {
      this.audioEl.play()
      this.isPlaying = true
    } else {
      this.isPlaying = false
      this.audioEl.pause()
    }
  }

  editWord() {
    if ( this.wordService.setSharedWord( this.word ) ) {
      this.router.navigate(['/word/' + this.word.text + '/edit'])
    }
  }
  deleteWord() {
    this.wordService.deleteWord(this.word)
                    .subscribe((result) => this.router.navigate(['/list']),
                              (error: any) => this.errorMessage = <any>error)
  }

}
