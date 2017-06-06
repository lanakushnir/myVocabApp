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
var WordNewComponent = (function () {
    function WordNewComponent(wordService, router) {
        this.wordService = wordService;
        this.router = router;
        this.isErrorMessage = false;
        this.wordToApi = null;
    }
    WordNewComponent.prototype.saveWord = function (text) {
        var _this = this;
        this.isErrorMessage = false;
        this.wordToApi = text;
        this.errorReason = null;
        this.word = null;
        if (!text.trim())
            return;
        this.wordService.saveWord(text)
            .subscribe(function (json) { return _this.displayWord(json); }, function (error) { return _this.displayError(error); });
    };
    WordNewComponent.prototype.displayWord = function (json) {
        if (json.does_exist) {
            this.errorReason = { wordExist: json.does_exist };
            this.displayError();
        }
        this.word = json;
    };
    WordNewComponent.prototype.displayError = function (error) {
        this.isErrorMessage = true;
    };
    WordNewComponent.prototype.getErrorMessage = function () {
        var message = "";
        var errorMessage = {
            default: "<p>Sorry, couldn't find word '" + this.wordToApi + "'. Would you like to <a href='/add'>create it</a>?</p>",
            wordExist: "<p>Word '" + this.wordToApi + "' was already added before. Moving to <a href='/list'>Today</a> list.</p>"
        };
        if (this.errorReason) {
            message = errorMessage[String(Object.keys(this.errorReason)[0])];
        }
        else {
            message = errorMessage["default"];
        }
        return message;
    };
    WordNewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'word-new',
            templateUrl: './word-new.component.html',
        }), 
        __metadata('design:paramtypes', [word_service_1.WordService, router_1.Router])
    ], WordNewComponent);
    return WordNewComponent;
}());
exports.WordNewComponent = WordNewComponent;
//# sourceMappingURL=word-new.component.js.map