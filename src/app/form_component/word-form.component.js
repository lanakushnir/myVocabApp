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
        this.param = this.route.snapshot.params['text'];
    }
    WordFormComponent.prototype.ngOnInit = function () {
        this.word = this.wordService.getSharedWord();
        if (this.word) {
            this.createForm(this.word);
            this.wordService.deleteSharedWord();
        }
        else if (!this.param) {
            this.getDummyWord();
        }
        else {
            this.getWord();
        }
    };
    WordFormComponent.prototype.getWord = function () {
        var _this = this;
        this.wordService.getWord(this.param)
            .subscribe(function (word) { return _this.createForm(_this.word = word); }, function (error) { return _this.errorMessage = error; });
    };
    WordFormComponent.prototype.updateOrCreateWord = function () {
        var word = this.wordForm.value;
        if (this.param) {
            this.updateWord(word);
        }
        else {
            this.createWord(word);
        }
    };
    WordFormComponent.prototype.updateWord = function (word) {
        var _this = this;
        this.wordService.updateWord(word)
            .subscribe(function (word) { return _this.showUpdatedWord(word); }, function (error) { return _this.errorMessage = error; });
    };
    WordFormComponent.prototype.createWord = function (word) {
        var _this = this;
        this.wordService.createWord(word)
            .subscribe(function (word) { return _this.showUpdatedWord(word); }, function (error) { return _this.errorMessage = error; });
    };
    WordFormComponent.prototype.showUpdatedWord = function (word) {
        if (!word)
            return;
        this.router.navigate(['/word/' + word.text]);
    };
    WordFormComponent.prototype.deleteWord = function () {
        var _this = this;
        this.wordService.deleteWord(this.word)
            .subscribe(function (result) { return _this.router.navigate(['/list']); }, function (error) { return _this.errorMessage = error; });
    };
    WordFormComponent.prototype.getDummyWord = function () {
        this.word = this.wordService.getDummyWord();
        this.createForm(this.word);
    };
    WordFormComponent.prototype.createForm = function (word) {
        if (!word)
            return;
        var w = this.mapWord(word);
        this.wordForm = this.fb.group({
            id: this.fb.control(w.id),
            text: this.fb.control(w.text),
            lexicalCategory: this.fb.control(w.lexicalCategory),
            pronunciations: this.fb.array(this.addPronunciationsArray(w)),
            senses: this.fb.array(this.addSensesArray(w)),
            etymologies: this.fb.array(this.addEtymologiesArray(w))
        });
    };
    WordFormComponent.prototype.mapWord = function (word) {
        this.word = word;
        var w = {};
        w.id = word.id;
        w.text = word.text;
        w.lexicalCategory = word.lexicalCategory;
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
        w.senses = [];
        for (var _b = 0, _c = word.senses; _b < _c.length; _b++) {
            var s = _c[_b];
            var obj = {};
            obj.id = s.id;
            if (s.definition) {
                obj.definition = s.definition;
            }
            if (s.example) {
                obj.example = s.example;
            }
            w.senses.push(obj);
        }
        w.etymologies = [];
        for (var _d = 0, _e = word.etymologies; _d < _e.length; _d++) {
            var e = _e[_d];
            if (e) {
                w.etymologies.push(e);
            }
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
                obj.phoneticSpelling = this.fb.control(p.phoneticSpelling);
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
        var formGroup = this.fb.group({ phoneticSpelling: null, audioFile: null, id: null });
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
    // SENSES
    WordFormComponent.prototype.addSensesArray = function (w) {
        var arr = [];
        for (var _i = 0, _a = w.senses; _i < _a.length; _i++) {
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
    WordFormComponent.prototype.addSensesGroup = function () {
        var formArray = this.wordForm.controls["senses"];
        var formGroup = this.fb.group({ definition: null, example: null, id: null });
        formArray.push(formGroup);
    };
    WordFormComponent.prototype.deleteDefinitionControl = function (i) {
        var formArray = this.wordForm.controls["senses"];
        var formGroup = formArray.at(i);
        formGroup.removeControl("definition");
        if (!formGroup.contains("example")) {
            formArray.removeAt(i);
        }
    };
    WordFormComponent.prototype.deleteExampleControl = function (i) {
        var formArray = this.wordForm.controls["senses"];
        var formGroup = formArray.at(i);
        formGroup.removeControl("example");
        if (!formGroup.contains("definition")) {
            formArray.removeAt(i);
        }
    };
    // ETYMOLOGIES
    WordFormComponent.prototype.addEtymologiesArray = function (w) {
        var arr = [];
        for (var _i = 0, _a = w.etymologies; _i < _a.length; _i++) {
            var e = _a[_i];
            arr.push(this.fb.control(e));
        }
        return arr;
    };
    WordFormComponent.prototype.addEtymologyControl = function () {
        var formArray = this.wordForm.controls["etymologies"];
        var formControl = this.fb.control(null);
        formArray.push(formControl);
    };
    WordFormComponent.prototype.deleteEtymologyControl = function (i) {
        var formArray = this.wordForm.controls["etymologies"];
        formArray.removeAt(i);
    };
    WordFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'word-form',
            templateUrl: './word-form.component.html'
        }), 
        __metadata('design:paramtypes', [word_service_1.WordService, router_1.ActivatedRoute, router_1.Router, forms_1.FormBuilder])
    ], WordFormComponent);
    return WordFormComponent;
}());
exports.WordFormComponent = WordFormComponent;
//# sourceMappingURL=word-form.component.js.map