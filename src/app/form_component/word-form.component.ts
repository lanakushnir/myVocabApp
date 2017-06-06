import { Component, Input, OnInit }          from '@angular/core'
import { FormsModule, ReactiveFormsModule, FormBuilder,
         FormGroup, FormControl, FormArray } from '@angular/forms'
import { Router, ActivatedRoute, Params }    from '@angular/router'
import { WordService }                       from '../word.service'
import { Word, Pronunciation, Entry, Sense } from '../word'

@Component({
  moduleId: module.id,
  selector: 'word-form',
  templateUrl: './word-form.component.html'
})
export class WordFormComponent implements OnInit {
  params = this.route.snapshot.params['text']
  public wordForm: FormGroup
  errorMessage: string
  word: Word

  constructor (private wordService: WordService,
               private route: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder) {}

  ngOnInit() {
    this.word = this.wordService.getSharedWord()
    if (this.word) {
      this.createForm(this.word)
      this.wordService.deleteSharedWord() }
    else if (!this.params) { this.getDummyWord() }
    else { this.getWord() }
  }
  getWord() {
    this.wordService.getWord(this.params)
                    .subscribe((word: Word) => this.createForm( this.word = word ),
                              (error: any) =>  this.errorMessage = <any>error)
  }
  updateOrCreateWord() {
    var word = this.wordForm.value
    if (this.params) {
      this.updateWord(word)
    } else {
      this.createWord(word)
    }
  }
  updateWord(word: Word) {
    this.wordService.updateWord(word)
                    .subscribe((word: Word) => this.showUpdatedWord(word),
                              (error: any) => this.errorMessage = <any>error)
  }
  createWord(word: Word) {
    this.wordService.createWord(word)
                    .subscribe((word: Word) => this.showUpdatedWord(word),
                              (error: any) => this.errorMessage = <any>error)
  }
  showUpdatedWord(word: Word) {
    if (!word) return
    this.router.navigate(['/word/' + word.text])
  }
  deleteWord() {
    this.wordService.deleteWord(this.word)
                    .subscribe((result) => this.router.navigate(['/list']),
                              (error: any) => this.errorMessage = <any>error)
  }
  getDummyWord() {
    this.word = this.wordService.getDummyWord()
    this.createForm(this.word)
  }

  createForm(word: Word) {
    if (!word) return
    var w = this.mapWord(word)

    this.wordForm = this.fb.group({
      id: this.fb.control(w.id),
      text: this.fb.control(w.text),
      pronunciations: this.fb.array( this.addPronunciationsArray(w) ),
      entries: this.fb.array( this.addEntriesArray(w) )
    })
  }
  mapWord(word?: Word) {
    this.word = word
    var w: any = {}
    w.id = word.id
    w.text = word.text

    w.pronunciations = []
    for (let p of word.pronunciations) {
      var obj: any = {}
      obj.id = p.id
      if (p.audioFile) { obj.audioFile = p.audioFile }
      if (p.phoneticSpelling) { obj.phoneticSpelling = p.phoneticSpelling }
      w.pronunciations.push(obj)
    }

    w.entries = []
    for (let e of word.entries) {
      var obj: any = {}
      obj.id = e.id
      if (e.lexicalCategory) { obj.lexicalCategory = e.lexicalCategory }
      obj.etymologies = []
      if (e.etymologies) {
        for (let et of e.etymologies) {
          if (et) { obj.etymologies.push(et) }
        }
      }
      obj.senses = []
      if (e.senses) {
        for (let s of e.senses) {
          var s_obj: any = {}
          s_obj.id = s.id
          if (s.definition) { s_obj.definition = s.definition }
          if (s.example) { s_obj.example = s.example }
          obj.senses.push(s_obj)
        }
      }
      w.entries.push(obj)
    }
    return w
  }

  // PRONUNCIATIONS
  addPronunciationsArray(w: Word) {
    var arr: any[] = []
    for (let p of w.pronunciations) {
      var obj: any = {}
      obj.id = this.fb.control(p.id)
      if (p.phoneticSpelling) { obj.phoneticSpelling = this.fb.control(p.phoneticSpelling) }
      if (p.audioFile) { obj.audioFile = this.fb.control(p.audioFile) }
      arr.push( this.fb.group( obj ) )
    }
    return arr
  }
  addPronunciationGroup() {
    const formArray = <FormArray>this.wordForm.controls["pronunciations"]
    let formGroup = <FormGroup>this.fb.group( { audioFile: null, phoneticSpelling: null })
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

  addEntriesArray(w: Word) {
    var arr: any[] = []
    for (let e of w.entries) {
      var obj: any = {}
      obj.id = this.fb.control(e.id)
      if (e.lexicalCategory) { obj.lexicalCategory = this.fb.control(e.lexicalCategory) }
      if (e.etymologies) { obj.etymologies = this.fb.array( this.addEtymologiesArray(e) ) }
      if (e.senses) { obj.senses = this.fb.array( this.addSensesArray(e) ) }
      arr.push( this.fb.group( obj ) )
    }
    return arr
  }
  addEntryGroup() {
    const formArray = <FormArray>this.wordForm.controls["entries"]
    let formGroup = <FormGroup>this.fb.group( { lexicalCategory: null, etymologies: this.fb.array([]), senses: this.fb.array([]) })
    formArray.push( formGroup )
  }
  deleteEntryGroup(i: number) {
    const formArray = <FormArray>this.wordForm.controls["entries"]
    formArray.removeAt(i)
  }

  // ETYMOLOGIES
  addEtymologiesArray(e: Entry) {
    var arr: any[] = []
    for (let et of e.etymologies)  { arr.push( this.fb.control(et) )}
    return arr
  }
  addEtymologyControl(i: number) {
    const formArray = <FormArray>this.wordForm.controls["entries"]["controls"][i]["controls"]["etymologies"]
    let formControl = <FormControl>this.fb.control( null )
    formArray.push( formControl )
  }
  deleteEtymologyControl(i:number, j: number) {
    const formArray = <FormArray>this.wordForm.controls["entries"]["controls"][i]["controls"]["etymologies"]
    formArray.removeAt(j)
  }
  // SENSES
  addSensesArray(e: Entry) {
    var arr: any[] = []
    for (let s of e.senses) {
      var obj: any = {}
      obj.id = this.fb.control(s.id)
      if (s.definition) { obj.definition = this.fb.control(s.definition) }
      if (s.example) { obj.example = this.fb.control(s.example) }
      arr.push( this.fb.group( obj ) )
    }
    return arr
  }
  addSenseGroup(i: number) {
    const formArray = <FormArray>this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"]
    let formGroup = <FormGroup>this.fb.group( { definition: null, example: null })
    formArray.push( formGroup )
  }
  deleteDefinitionControl(i: number, j: number) {
    const formArray = <FormArray>this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"]
    const formGroup = <FormGroup>formArray.at(j)
    formGroup.removeControl("definition")
    if ( !formGroup.contains("example") ) { formArray.removeAt(j) }
  }
  deleteExampleControl(i: number, j: number) {
    const formArray = <FormArray>this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"]
    const formGroup = <FormGroup>formArray.at(j)
    formGroup.removeControl("example")
    if ( !formGroup.contains("definition") ) { formArray.removeAt(j) }
  }

}
