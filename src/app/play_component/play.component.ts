import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WordService }            from '../word.service';
import { List, Word }             from '../word';

@Component({
  moduleId: module.id,
  selector: 'play',
  templateUrl: './play.component.html'
})
export class PlayComponent implements OnInit {
  param = this.route.snapshot.params['list'];
  errorMessage: string;
  list: List;
  shuffledArray: number[] = [];
  currentWord: Word;
  currentWordIndex: number;
  currentIndexOfShuffledArray: number;
  isWordRevealed: boolean = false;
  isResultsPage: boolean = false;

  constructor (private wordService: WordService, private route: ActivatedRoute) {}

  ngOnInit() { this.getList(); }

  getList() {
    this.wordService.getList( this.param )
                    .subscribe( (list: List) => this.saveShuffledList(list),
                                (error: any) =>  this.errorMessage = <any>error);
  }

  saveShuffledList(list: List) {
    this.list = list
    let max = this.list.words.length;
    this.createArray(max);
    this.shuffleInPlace( this.shuffledArray );
    this.showNextWord();
  }

  createArray(max: number) {
    while (this.shuffledArray.length < max ) {
      var n: number = this.shuffledArray.length;
      this.shuffledArray.push(n);
    }
  }

  shuffleInPlace(array: number[]): number[] {
    if (array.length <= 1) return array;
    for (let i = 0; i < array.length; i++) {
      const randomIndex = this.getRandom(i, array.length - 1);
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  calculateResult(result: boolean) {
    var word = this.currentWord;
    result ? word.needsToBeReviewed = word.needsToBeReviewed - 1
           : word.needsToBeReviewed = word.needsToBeReviewed + 3
    if ( word.needsToBeReviewed == 0 ) { this.showNextWord(); return;}
    this.updateWord( word );
    this.showNextWord();
  }

  updateWord(word: Word) {
    this.wordService.updateWord(word)
                    .subscribe((word: Word) => word,
                              (error: any) => this.errorMessage = <any>error);
  }

  showNextWord() {
    !this.currentWord ? this.currentIndexOfShuffledArray = 0
                      : this.currentIndexOfShuffledArray++;
    if (this.currentIndexOfShuffledArray == this.shuffledArray.length) { this.showResultsPage(); return; }
    var index = this.shuffledArray[ this.currentIndexOfShuffledArray ];
    var text = this.list.words[ index ]['text'];
    this.getWord( text );
  }

  getWord(text: string) {
    this.wordService.getWord( text )
                    .subscribe((word: Word) => this.displayWord(word),
                              (error: any) => this.errorMessage = <any>error);
  }

  displayWord(word: Word) {
    this.currentWord = word;
    this.isWordRevealed = false;
  }

  showResultsPage() {
    this.isResultsPage = true;
  }

  onPlayMore(event: any) {
    this.isResultsPage = false;
    this.currentWord = null;
    this.saveShuffledList(this.list);
  }

}
