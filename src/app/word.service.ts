
import { Injectable }                     from '@angular/core';
import { Http, Response, Headers }        from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { List, Word } from './word';

@Injectable()
export class WordService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private listsUrl = 'http://localhost:3000/lists';
  private wordsUrl = 'http://localhost:3000/words';
  private sharedWord: Word;

  constructor( private http: Http ) {}

  getSharedWord() { return this.sharedWord; }
  setSharedWord(word: Word) { this.sharedWord = word; return true; }
  deleteSharedWord() { this.sharedWord = null; return true; }

  getLists(): Observable<List[]> {
    return this.http.get( this.listsUrl )
                    .map( this.extractData )
                    .catch(this.handleError );
  }

  getList(param: string): Observable<List> {
    return this.http.get( this.listsUrl + '/' + param )
                    .map( this.extractData )
                    .catch(this.handleError );
  }

  getWord(param: string): Observable<Word> {
    return this.http.get( this.wordsUrl + '/' + param )
    .map( this.extractData )
    .catch(this.handleError );
  }
  saveWord(text: string): Observable<Word> {
    return this.http.post( this.wordsUrl, JSON.stringify({text: text}), {headers: this.headers})
                    .map( this.extractData )
                    .catch(this.handleError)
  }
  createWord(word: Word): Observable<Word> {
    return this.http.post( this.wordsUrl, JSON.stringify({word: word}), {headers: this.headers})
                    .map( this.extractData )
                    .catch(this.handleError)
  }
  updateWord(word: Word): Observable<Word> {
    return this.http.put( this.wordsUrl + '/' + word.text, JSON.stringify({word: word}), {headers: this.headers})
                    .map( this.extractData )
                    .catch(this.handleError)
  }
  deleteWord(word: Word): Observable<any> {
    return this.http.delete( this.wordsUrl + '/' + word.text, {headers: this.headers})
                    .map( this.extractData )
                    .catch(this.handleError)
  }
  getDummyWord() {
    var dummyWord: Word = {
      id: null,
      text: null,
      lexicalCategory: null,
      needsToBeReviewed: 10,
      pronunciations: [ ],
      senses: [ ],
      etymologies: [ ]
    }
    return dummyWord;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
