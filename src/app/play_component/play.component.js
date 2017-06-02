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
var PlayComponent = (function () {
    function PlayComponent(wordService, route) {
        this.wordService = wordService;
        this.route = route;
        this.param = this.route.snapshot.params['list'];
        this.shuffledArray = [];
        this.isWordRevealed = false;
        this.isResultsPage = false;
    }
    PlayComponent.prototype.ngOnInit = function () { this.getList(); };
    PlayComponent.prototype.getList = function () {
        var _this = this;
        this.wordService.getList(this.param)
            .subscribe(function (list) { return _this.saveShuffledList(list); }, function (error) { return _this.errorMessage = error; });
    };
    PlayComponent.prototype.saveShuffledList = function (list) {
        this.list = list;
        var max = this.list.words.length;
        this.createArray(max);
        this.shuffleInPlace(this.shuffledArray);
        this.showNextWord();
    };
    PlayComponent.prototype.createArray = function (max) {
        while (this.shuffledArray.length < max) {
            var n = this.shuffledArray.length;
            this.shuffledArray.push(n);
        }
    };
    PlayComponent.prototype.shuffleInPlace = function (array) {
        if (array.length <= 1)
            return array;
        for (var i = 0; i < array.length; i++) {
            var randomIndex = this.getRandom(i, array.length - 1)[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    };
    PlayComponent.prototype.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    PlayComponent.prototype.calculateResult = function (result) {
        var word = this.currentWord;
        result ? word.needsToBeReviewed = word.needsToBeReviewed - 1
            : word.needsToBeReviewed = word.needsToBeReviewed + 3;
        if (word.needsToBeReviewed == 0) {
            this.showNextWord();
            return;
        }
        this.updateWord(word);
        this.showNextWord();
    };
    PlayComponent.prototype.updateWord = function (word) {
        var _this = this;
        this.wordService.updateWord(word)
            .subscribe(function (word) { return word; }, function (error) { return _this.errorMessage = error; });
    };
    PlayComponent.prototype.showNextWord = function () {
        !this.currentWord ? this.currentIndexOfShuffledArray = 0
            : this.currentIndexOfShuffledArray++;
        if (this.currentIndexOfShuffledArray == this.shuffledArray.length) {
            this.showResultsPage();
            return;
        }
        var index = this.shuffledArray[this.currentIndexOfShuffledArray];
        var text = this.list.words[index]['text'];
        this.getWord(text);
    };
    PlayComponent.prototype.getWord = function (text) {
        var _this = this;
        this.wordService.getWord(text)
            .subscribe(function (word) { return _this.displayWord(word); }, function (error) { return _this.errorMessage = error; });
    };
    PlayComponent.prototype.displayWord = function (word) {
        this.currentWord = word;
        this.isWordRevealed = false;
    };
    PlayComponent.prototype.showResultsPage = function () {
        this.isResultsPage = true;
    };
    PlayComponent.prototype.onPlayMore = function (event) {
        this.isResultsPage = false;
        this.currentWord = null;
        this.saveShuffledList(this.list);
    };
    PlayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'play',
            templateUrl: './play.component.html'
        }), 
        __metadata('design:paramtypes', [word_service_1.WordService, router_1.ActivatedRoute])
    ], PlayComponent);
    return PlayComponent;
}());
exports.PlayComponent = PlayComponent;
//# sourceMappingURL=play.component.js.map