"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var word_service_1 = require('../word.service');
var WordFormComponent = (function () {
    function WordFormComponent(wordService, route, router, fb) {
        this.wordService = wordService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.params = this.route.snapshot.params['text'];
        this.goBackLink = this.params ? '/word/' + this.params : '/new';
        this.showErrorMessage = false;
        this.isFormValid = false;
        this.lexicalCategories = ['noun', 'verb', 'adjective', 'adverb', 'interjection', 'auxiliary verb'];
        this.errorMessages = {
            'text': 'Word text is required.',
            'pronunciations': 'Add at least one pronunciation.',
            'phoneticSpelling': 'Phonetic spelling is required.',
            'entries': 'Add at least one lexical entry.',
            'lexicalCategory': 'Select lexical category for the entry.',
            'senses': 'Add at least one sense of the word.',
            'definition': 'Definition field is required.',
            'createError': 'Sorry, there was an error. Could not create the word.',
            'updateError': 'Sorry, there was an error. Could not update the word.'
        };
    }
    WordFormComponent.prototype.ngOnInit = function () {
        this.word = this.wordService.getSharedWord();
        if (this.word) {
            this.buildForm(this.word);
            this.wordService.deleteSharedWord();
        }
        else if (!this.params) {
            this.getDummyWord();
        }
        else {
            this.getWord();
        }
    };
    WordFormComponent.prototype.getWord = function () {
        var _this = this;
        this.wordService.getWord(this.params)
            .subscribe(function (word) { return _this.buildForm(_this.word = word); }, function (error) { return _this.errorMessage = error; });
    };
    WordFormComponent.prototype.updateOrCreateWord = function () {
        if (!this.isFormValid)
            return;
        var word = this.wordForm.value;
        if (this.params) {
            this.updateWord(word);
        }
        else {
            this.createWord(word);
        }
    };
    WordFormComponent.prototype.updateWord = function (word) {
        var _this = this;
        this.wordService.updateWord(word)
            .subscribe(function (word) { return _this.showUpdatedWord(word); }, function (error) { return _this.presentError('updateError'); });
    };
    WordFormComponent.prototype.createWord = function (word) {
        var _this = this;
        this.wordService.createWord(word)
            .subscribe(function (word) { return _this.showUpdatedWord(word); }, function (error) { return _this.presentError('createError'); });
    };
    WordFormComponent.prototype.showUpdatedWord = function (word) {
        if (!word)
            return;
        this.router.navigate(['/word/' + word.text]);
    };
    WordFormComponent.prototype.getDummyWord = function () {
        this.word = this.wordService.getDummyWord();
        this.buildForm(this.word);
    };
    WordFormComponent.prototype.buildForm = function (word) {
        var _this = this;
        if (!word)
            return;
        var w = this.mapWord(word);
        this.wordForm = this.fb.group({
            id: this.fb.control(w.id),
            text: this.fb.control(w.text, forms_1.Validators.required),
            pronunciations: this.fb.array(this.addPronunciationsArray(w)),
            entries: this.fb.array(this.addEntriesArray(w))
        });
        this.wordForm.valueChanges.subscribe(function (data) { return _this.validateForm(); });
    };
    WordFormComponent.prototype.mapWord = function (word) {
        this.word = word;
        var w = {};
        w.id = word.id;
        w.text = word.text;
        w.pronunciations = [];
        for (var _i = 0, _a = word.pronunciations; _i < _a.length; _i++) {
            var p = _a[_i];
            var obj = {};
            obj.id = p.id;
            if (p.audioFile) {
                obj.audioFile = p.audioFile;
            }
            if (p.phoneticSpelling) {
                obj.phoneticSpelling = p.phoneticSpelling;
            }
            w.pronunciations.push(obj);
        }
        w.entries = [];
        for (var _b = 0, _c = word.entries; _b < _c.length; _b++) {
            var e = _c[_b];
            var obj = {};
            obj.id = e.id;
            if (e.lexicalCategory) {
                obj.lexicalCategory = e.lexicalCategory;
            }
            obj.etymologies = [];
            if (e.etymologies) {
                for (var _d = 0, _e = e.etymologies; _d < _e.length; _d++) {
                    var et = _e[_d];
                    if (et) {
                        obj.etymologies.push(et);
                    }
                }
            }
            obj.senses = [];
            if (e.senses) {
                for (var _f = 0, _g = e.senses; _f < _g.length; _f++) {
                    var s = _g[_f];
                    var s_obj = {};
                    s_obj.id = s.id;
                    if (s.definition) {
                        s_obj.definition = s.definition;
                    }
                    if (s.example) {
                        s_obj.example = s.example;
                    }
                    obj.senses.push(s_obj);
                }
            }
            w.entries.push(obj);
        }
        return w;
    };
    // PRONUNCIATIONS
    WordFormComponent.prototype.addPronunciationsArray = function (w) {
        var arr = [];
        for (var _i = 0, _a = w.pronunciations; _i < _a.length; _i++) {
            var p = _a[_i];
            var obj = {};
            obj.id = this.fb.control(p.id);
            if (p.phoneticSpelling) {
                obj.phoneticSpelling = this.fb.control(p.phoneticSpelling, forms_1.Validators.required);
            }
            if (p.audioFile) {
                obj.audioFile = this.fb.control(p.audioFile);
            }
            arr.push(this.fb.group(obj));
        }
        return arr;
    };
    WordFormComponent.prototype.addPronunciationGroup = function () {
        var formArray = this.wordForm.controls["pronunciations"];
        var formGroup = this.fb.group({ audioFile: null, phoneticSpelling: null });
        formArray.push(formGroup);
    };
    WordFormComponent.prototype.addP = function (i) {
        var formArray = this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"];
        var formGroup = this.fb.group({ definition: null, example: null });
        formArray.push(formGroup);
    };
    WordFormComponent.prototype.deletePhoneticSpellingControl = function (i) {
        var formArray = this.wordForm.controls["pronunciations"];
        var formGroup = formArray.at(i);
        formGroup.removeControl("phoneticSpelling");
        if (!formGroup.contains("audioFile")) {
            formArray.removeAt(i);
        }
    };
    WordFormComponent.prototype.deleteAudioFileControl = function (i) {
        var formArray = this.wordForm.controls["pronunciations"];
        var formGroup = formArray.at(i);
        formGroup.removeControl("audioFile");
        if (!formGroup.contains("phoneticSpelling")) {
            formArray.removeAt(i);
        }
    };
    // ENTRIES
    WordFormComponent.prototype.addEntriesArray = function (w) {
        var arr = [];
        for (var _i = 0, _a = w.entries; _i < _a.length; _i++) {
            var e = _a[_i];
            var obj = {};
            obj.id = this.fb.control(e.id);
            if (e.lexicalCategory) {
                obj.lexicalCategory = this.fb.control(e.lexicalCategory, forms_1.Validators.required);
            }
            if (e.etymologies) {
                obj.etymologies = this.fb.array(this.addEtymologiesArray(e));
            }
            if (e.senses) {
                obj.senses = this.fb.array(this.addSensesArray(e));
            }
            arr.push(this.fb.group(obj));
        }
        return arr;
    };
    WordFormComponent.prototype.addEntryGroup = function () {
        var formArray = this.wordForm.controls["entries"];
        var formGroup = this.fb.group({ lexicalCategory: null, etymologies: this.fb.array([]), senses: this.fb.array([]) });
        formArray.push(formGroup);
    };
    WordFormComponent.prototype.deleteEntryGroup = function (i) {
        var formArray = this.wordForm.controls["entries"];
        formArray.removeAt(i);
    };
    // ETYMOLOGIES
    WordFormComponent.prototype.addEtymologiesArray = function (e) {
        var arr = [];
        for (var _i = 0, _a = e.etymologies; _i < _a.length; _i++) {
            var et = _a[_i];
            arr.push(this.fb.control(et));
        }
        return arr;
    };
    WordFormComponent.prototype.addEtymologyControl = function (i) {
        var formArray = this.wordForm.controls["entries"]["controls"][i]["controls"]["etymologies"];
        var formControl = this.fb.control(null);
        formArray.push(formControl);
    };
    WordFormComponent.prototype.deleteEtymologyControl = function (i, j) {
        var formArray = this.wordForm.controls["entries"]["controls"][i]["controls"]["etymologies"];
        formArray.removeAt(j);
    };
    // SENSES
    WordFormComponent.prototype.addSensesArray = function (e) {
        var arr = [];
        for (var _i = 0, _a = e.senses; _i < _a.length; _i++) {
            var s = _a[_i];
            var obj = {};
            obj.id = this.fb.control(s.id);
            if (s.definition) {
                obj.definition = this.fb.control(s.definition);
            }
            if (s.example) {
                obj.example = this.fb.control(s.example);
            }
            arr.push(this.fb.group(obj));
        }
        return arr;
    };
    WordFormComponent.prototype.addSenseGroup = function (i) {
        var formArray = this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"];
        var formGroup = this.fb.group({ definition: null, example: null });
        formArray.push(formGroup);
    };
    WordFormComponent.prototype.deleteDefinitionControl = function (i, j) {
        var formArray = this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"];
        var formGroup = formArray.at(j);
        formGroup.removeControl("definition");
        if (!formGroup.contains("example")) {
            formArray.removeAt(j);
        }
    };
    WordFormComponent.prototype.deleteExampleControl = function (i, j) {
        var formArray = this.wordForm.controls["entries"]["controls"][i]["controls"]["senses"];
        var formGroup = formArray.at(j);
        formGroup.removeControl("example");
        if (!formGroup.contains("definition")) {
            formArray.removeAt(j);
        }
    };
    // VALIDATION
    WordFormComponent.prototype.validateForm = function () {
        this.showErrorMessage = false;
        var form = this.wordForm;
        var t = form.controls['text'];
        if (!t['valid']) {
            this.presentError('text');
            return;
        }
        var p = this.wordForm.controls['pronunciations'];
        var p_length = p['length'];
        if (p_length < 1) {
            this.presentError('pronunciations');
            return;
        }
        for (var i = 0; i < p_length; i++) {
            var ps = this.wordForm.controls['pronunciations']['controls'][i]['controls']['phoneticSpelling'];
            if (ps && !ps['valid'] || !ps) {
                this.presentError('phoneticSpelling');
                return;
            }
        }
        var e = this.wordForm.controls['entries'];
        var e_length = e['length'];
        if (e_length < 1) {
            this.presentError('entries');
            return;
        }
        for (var i = 0; i < e_length; i++) {
            var lc = this.wordForm.controls['entries']['controls'][i]['controls']['lexicalCategory'];
            if (!lc['valid']) {
                this.presentError('lexicalCategory');
                return;
            }
            var s = this.wordForm.controls['entries']['controls'][i]['controls']['senses'];
            var s_length = s['length'];
            if (s_length < 1) {
                this.presentError('senses');
                return;
            }
            for (var j = 0; j < s_length; j++) {
                var d = this.wordForm.controls['entries']['controls'][i]['controls']['senses']['controls'][j]['controls']['definition'];
                if (d && !d['valid'] || !d) {
                    this.presentError('definition');
                    return;
                }
            }
        }
        this.isFormValid = true;
    };
    WordFormComponent.prototype.presentError = function (key) {
        this.showErrorMessage = true;
        this.errorMessage = this.errorMessages[key];
    };
    WordFormComponent = __decorate([
        core_1.Component({
            selector: 'word-form',
            moduleId: module.id,
            templateUrl: './word-form.component.html'
        }), 
        __metadata('design:paramtypes', [word_service_1.WordService, router_1.ActivatedRoute, router_1.Router, forms_1.FormBuilder])
    ], WordFormComponent);
    return WordFormComponent;
}());
exports.WordFormComponent = WordFormComponent;
//# sourceMappingURL=word-form.component.js.map