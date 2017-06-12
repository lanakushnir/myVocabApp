import { Component, Input, OnInit }          from '@angular/core'
import { ReactiveFormsModule, FormBuilder, FormGroup,
        FormControl, FormArray, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params }    from '@angular/router'
import { Observable }                        from 'rxjs/Rx'
import { WordService }                       from '../word.service'
import { Word, Pronunciation, Entry, Sense } from '../word'

@Component({
  selector: 'word-form',
  moduleId: module.id,
  templateUrl: './word-form.component.html'
})
export class WordFormComponent implements OnInit {
  params = this.route.snapshot.params['text']
  goBackLink: string = this.params ? '/word/'+this.params : '/new'
  public wordForm: FormGroup
  errorMessage: string
  showErrorMessage: boolean = false
  isFormValid: boolean = false
  word: Word
  lexicalCategories: string[] = ['noun', 'verb', 'adjective', 'adverb', 'interjection', 'auxiliary verb']

  constructor (private wordService: WordService,
               private route: ActivatedRoute,
               private router: Router,
               private fb: FormBuilder) {}

  ngOnInit() {
    this.word = this.wordService.getSharedWord()
    if (this.word) {
      this.buildForm(this.word)
      this.wordService.deleteSharedWord() }
    else if (!this.params) { this.getDummyWord() }
    else { this.getWord() }
  }
  getWord() {
    this.wordService.getWord(this.params)
                    .subscribe((word: Word) => this.buildForm( this.word = word ),
                              (error: any) =>  this.errorMessage = <any>error)
  }
  updateOrCreateWord() {
    if (!this.isFormValid) return
    var word = this.wordForm.value
    if (this.params) { this.updateWord(word) }
                else { this.createWord(word) }
  }
  updateWord(word: Word) {
    this.wordService.updateWord(word)
                    .subscribe((word: Word) => this.showUpdatedWord(word),
                              (error: any) => this.presentError('updateError'))
  }
  createWord(word: Word) {
    this.wordService.createWord(word)
                    .subscribe((word: Word) => this.showUpdatedWord(word),
                              (error: any) => this.presentError('createError'))
  }
  showUpdatedWord(word: Word) {
    if (!word) return
    this.router.navigate(['/word/' + word.text])
  }
  getDummyWord() {
    this.word = this.wordService.getDummyWord()
    this.buildForm(this.word)
  }

  buildForm(word: Word) {
    if (!word) return
    var w = this.mapWord(word)

    this.wordForm = this.fb.group({
      id: this.fb.control(w.id),
      text: this.fb.control(w.text, Validators.required) ,
      pronunciations: this.fb.array( this.addPronunciationsArray(w) ),
      entries: this.fb.array( this.addEntriesArray(w) )
    })
    this.wordForm.valueChanges.subscribe(data => this.validateForm())
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
      if (p.phoneticSpelling) { obj.phoneticSpelling = this.fb.control(p.phoneticSpelling, Validators.required) }
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
  addP(i: number) {
    const formArray = <FormArray>this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"]
    let formGroup = <FormGroup>this.fb.group( { definition: null, example: null })
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
  // ENTRIES
  addEntriesArray(w: Word) {
    var arr: any[] = []
    for (let e of w.entries) {
      var obj: any = {}
      obj.id = this.fb.control(e.id)
      if (e.lexicalCategory) { obj.lexicalCategory = this.fb.control( e.lexicalCategory, Validators.required ) }
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

  // VALIDATION
  validateForm() {
    this.showErrorMessage = false;
    var form = this.wordForm

    var t = form.controls['text']
    if (!t['valid']) { this.presentError('text'); return }

    var p = this.wordForm.controls['pronunciations']
    var p_length: number = p['length']
    if (p_length < 1) { this.presentError('pronunciations'); return }
    for (var i = 0; i < p_length; i++) {
      var ps = this.wordForm.controls['pronunciations']['controls'][i]['controls']['phoneticSpelling']
      if (ps && !ps['valid'] || !ps) { this.presentError('phoneticSpelling'); return }
    }

    var e = this.wordForm.controls['entries']
    var e_length: number = e['length']
    if (e_length < 1) { this.presentError('entries'); return }
    for (var i = 0; i < e_length; i++) {
      var lc = this.wordForm.controls['entries']['controls'][i]['controls']['lexicalCategory']
      if (!lc['valid']) { this.presentError('lexicalCategory'); return }
      var s = this.wordForm.controls['entries']['controls'][i]['controls']['senses']
      var s_length: number = s['length']
      if (s_length < 1) { this.presentError('senses'); return }
      for (var j = 0; j < s_length; j++) {
        var d = this.wordForm.controls['entries']['controls'][i]['controls']['senses']['controls'][j]['controls']['definition']
        if (d && !d['valid'] || !d) { this.presentError('definition'); return }
      }
    }
    this.isFormValid = true
  }
  presentError(key?: string) {
    this.showErrorMessage = true
    this.errorMessage = this.errorMessages[key]
  }
  errorMessages = {
    'text':  'Word text is required.',
    'pronunciations': 'Add at least one pronunciation.',
    'phoneticSpelling': 'Phonetic spelling is required.' ,
    'entries': 'Add at least one lexical entry.',
    'lexicalCategory': 'Select lexical category for the entry.',
    'senses': 'Add at least one sense of the word.',
    'definition': 'Definition field is required.',
    'createError': 'Sorry, there was an error. Could not create the word.',
    'updateError': 'Sorry, there was an error. Could not update the word.'
  }
}
