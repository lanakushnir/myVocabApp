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
    }
    WordFormComponent.prototype.ngOnInit = function () {
        this.word = this.wordService.getSharedWord();
        if (this.word) {
            this.createForm(this.word);
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
            .subscribe(function (word) { return _this.createForm(_this.word = word); }, function (error) { return _this.errorMessage = error; });
    };
    WordFormComponent.prototype.updateOrCreateWord = function () {
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
            pronunciations: this.fb.array(this.addPronunciationsArray(w)),
            entries: this.fb.array(this.addEntriesArray(w))
        });
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
        var formGroup = this.fb.group({ audioFile: null, phoneticSpelling: null });
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
    WordFormComponent.prototype.addEntriesArray = function (w) {
        var arr = [];
        for (var _i = 0, _a = w.entries; _i < _a.length; _i++) {
            var e = _a[_i];
            var obj = {};
            obj.id = this.fb.control(e.id);
            if (e.lexicalCategory) {
                obj.lexicalCategory = this.fb.control(e.lexicalCategory);
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