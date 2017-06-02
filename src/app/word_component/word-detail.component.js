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
var router_1 = require('@angular/router');
var word_service_1 = require('../word.service');
var word_1 = require('../word');
var WordDetailComponent = (function () {
    function WordDetailComponent(wordService, router, route) {
        this.wordService = wordService;
        this.router = router;
        this.route = route;
        this.wordToEdit = new core_1.EventEmitter();
        this.param = this.route.snapshot.params['text'];
        this.isPlaying = false;
    }
    WordDetailComponent.prototype.ngOnInit = function () {
        if (!this.word) {
            this.getWord();
        }
    };
    WordDetailComponent.prototype.getWord = function () {
        var _this = this;
        this.wordService.getWord(this.param)
            .subscribe(function (word) { return _this.word = word; }, function (error) { return _this.errorMessage = error; });
    };
    WordDetailComponent.prototype.playAudio = function () {
        if (!this.audioEl) {
            this.audioEl = document.getElementById("audio");
        }
        if (!this.isPlaying) {
            this.audioEl.play();
            this.isPlaying = true;
        }
        else {
            this.isPlaying = false;
            this.audioEl.pause();
        }
    };
    WordDetailComponent.prototype.editWord = function () {
        if (this.wordService.setSharedWord(this.word)) {
            this.router.navigate(['/word/' + this.word.text + '/edit']);
        }
        ;
    };
    WordDetailComponent.prototype.deleteWord = function () {
        var _this = this;
        this.wordService.deleteWord(this.word)
            .subscribe(function (result) { return _this.router.navigate(['/list']); }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], WordDetailComponent.prototype, "isBrief", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', word_1.Word)
    ], WordDetailComponent.prototype, "word", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WordDetailComponent.prototype, "wordToEdit", void 0);
    WordDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'word-detail',
            templateUrl: './word-detail.component.html'
        }), 
        __metadata('design:paramtypes', [word_service_1.WordService, router_1.Router, router_1.ActivatedRoute])
    ], WordDetailComponent);
    return WordDetailComponent;
}());
exports.WordDetailComponent = WordDetailComponent;
//# sourceMappingURL=word-detail.component.js.map