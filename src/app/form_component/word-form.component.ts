import { Component, Input, OnInit }          from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params }    from '@angular/router';
import { WordService }                       from '../word.service';
import { Word, Pronunciation, Sense }        from '../word';

@Component({
  moduleId: module.id,
  selector: 'word-form',
  templateUrl: './word-form.component.html'
})
export class WordFormComponent implements OnInit {
  param = this.route.snapshot.params['text'];
  public wordForm: FormGroup;
  errorMessage: string;
  word: Word;

  constructor (private wordService: WordService,
               private route: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder) {}

  ngOnInit() {
    this.word = this.wordService.getSharedWord();
    if (this.word) {
      this.createForm(this.word);
      this.wordService.deleteSharedWord() }
    else if (!this.param) { this.getDummyWord() }
    else { this.getWord(); }
  }

  getWord() {
    this.wordService.getWord(this.param)
                    .subscribe((word: Word) => this.createForm( this.word = word ),
                              (error: any) =>  this.errorMessage = <any>error);
  }
  updateOrCreateWord() {
    var word = this.wordForm.value;
    if (this.param) {
      this.updateWord(word)
    } else {
      this.createWord(word)
    }
  }
  updateWord(word: Word) {
    this.wordService.updateWord(word)
                    .subscribe((word: Word) => this.showUpdatedWord(word),
                              (error: any) => this.errorMessage = <any>error);
  }
  createWord(word: Word) {
    this.wordService.createWord(word)
                    .subscribe((word: Word) => this.showUpdatedWord(word),
                              (error: any) => this.errorMessage = <any>error);
  }
  showUpdatedWord(word: Word) {
    if (!word) return;
    this.router.navigate(['/word/' + word.text]);
  }
  deleteWord() {
    this.wordService.deleteWord(this.word)
                    .subscribe((result) => this.router.navigate(['/list']),
                              (error: any) => this.errorMessage = <any>error);
  }
  getDummyWord() {
    this.word = this.wordService.getDummyWord()
    this.createForm(this.word);
  }

  createForm(word: Word) {
    if (!word) return;
    var w = this.mapWord(word);

    this.wordForm = this.fb.group({
      id: this.fb.control(w.id),
      text: this.fb.control(w.text),
      lexicalCategory: this.fb.control(w.lexicalCategory),
      pronunciations: this.fb.array( this.addPronunciationsArray(w) ),
      senses: this.fb.array( this.addSensesArray(w) ),
      etymologies: this.fb.array( this.addEtymologiesArray(w) )
    })
  }
  mapWord(word?: Word) {
    this.word = word;
    var w: any = {};
    w.id = word.id
    w.text = word.text;
    w.lexicalCategory = word.lexicalCategory;
    w.pronunciations = []
    for (let p of word.pronunciations) {
      var obj: any = {};
      obj.id = p.id
      if (p.audioFile) { obj.audioFile = p.audioFile }
      if (p.phoneticSpelling) { obj.phoneticSpelling = p.phoneticSpelling }
      w.pronunciations.push(obj)
    }
    w.senses = [];
    for (let s of word.senses) {
      var obj: any = {};
      obj.id = s.id
      if (s.definition) { obj.definition = s.definition }
      if (s.example) { obj.example = s.example }
      w.senses.push(obj);
    }
    w.etymologies = []
    for (let e of word.etymologies) { if (e) { w.etymologies.push(e) } }
    return w;
  }

  // PRONUNCIATIONS
  addPronunciationsArray(w: Word) {
    var arr: any[] = [];
    for (let p of w.pronunciations) {
      var obj: any = {}
      obj.id = this.fb.control(p.id)
      if (p.phoneticSpelling) { obj.phoneticSpelling = this.fb.control(p.phoneticSpelling) }
      if (p.audioFile) { obj.audioFile = this.fb.control(p.audioFile) }
      arr.push( this.fb.group( obj ) ) ;
    }
    return arr;
  }
  addPronunciationGroup() {
    const formArray = <FormArray>this.wordForm.controls["pronunciations"]
    let formGroup = <FormGroup>this.fb.group( { phoneticSpelling: null, audioFile: null, id: null })
    formArray.push( formGroup )
  }
  deletePhoneticSpellingControl(i: number) {
    const formArray = <FormArray>this.wordForm.controls["pronunciations"]
    const formGroup = <FormGroup>formArray.at(i)
    formGroup.removeControl("phoneticSpelling")
    if ( !formGroup.contains("audioFile") ) { formArray.removeAt(i) }
  }
  deleteAudioFileControl(i: number) {
    const formArray = <FormArray>this.wordForm.controls["pronunciations"]
    const formGroup = <FormGroup>formArray.at(i)
    formGroup.removeControl("audioFile")
    if ( !formGroup.contains("phoneticSpelling") ) { formArray.removeAt(i) }
  }

  // SENSES
  addSensesArray(w: Word) {
    var arr: any[] = []
    for (let s of w.senses) {
      var obj: any = {}
      obj.id = this.fb.control(s.id)
      if (s.definition) { obj.definition = this.fb.control(s.definition) }
      if (s.example) { obj.example = this.fb.control(s.example) }
      arr.push( this.fb.group( obj ) );
    }
    return arr
  }
  addSensesGroup() {
    const formArray = <FormArray>this.wordForm.controls["senses"]
    let formGroup = <FormGroup>this.fb.group( { definition: null, example: null, id: null})
    formArray.push( formGroup )
  }
  deleteDefinitionControl(i: number) {
    const formArray = <FormArray>this.wordForm.controls["senses"]
    const formGroup = <FormGroup>formArray.at(i)
    formGroup.removeControl("definition")
    if ( !formGroup.contains("example") ) { formArray.removeAt(i) }
  }
  deleteExampleControl(i: number) {
    const formArray = <FormArray>this.wordForm.controls["senses"]
    let formGroup = <FormGroup>formArray.at(i)
    formGroup.removeControl("example")
    if ( !formGroup.contains("definition") ) { formArray.removeAt(i) }
  }

  // ETYMOLOGIES
  addEtymologiesArray(w: Word) {
    var arr: any[] = [];
    for (let e of w.etymologies)  { arr.push( this.fb.control(e) )}
    return arr;
  }
  addEtymologyControl() {
    const formArray = <FormArray>this.wordForm.controls["etymologies"]
    let formControl = <FormControl>this.fb.control( null )
    formArray.push( formControl )
  }
  deleteEtymologyControl(i: number) {
    const formArray = <FormArray>this.wordForm.controls["etymologies"]
    formArray.removeAt(i);
  }



}
