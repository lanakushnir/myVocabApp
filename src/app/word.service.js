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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var WordService = (function () {
    function WordService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.listsUrl = 'http://localhost:3000/lists';
        this.wordsUrl = 'http://localhost:3000/words';
    }
    WordService.prototype.getSharedWord = function () { return this.sharedWord; };
    WordService.prototype.setSharedWord = function (word) { this.sharedWord = word; return true; };
    WordService.prototype.deleteSharedWord = function () { this.sharedWord = null; return true; };
    WordService.prototype.getLists = function () {
        return this.http.get(this.listsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WordService.prototype.getList = function (params) {
        return this.http.get(this.listsUrl + '/' + params)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WordService.prototype.getWord = function (params) {
        return this.http.get(this.wordsUrl + '/' + params)
            .map(this.extractData)
            .catch(this.handleError);
    };
    WordService.prototype.saveWord = function (text) {
        return this.http.post(this.wordsUrl, JSON.stringify({ text: text }), { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    WordService.prototype.createWord = function (word) {
        return this.http.post(this.wordsUrl, JSON.stringify({ word: word }), { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    WordService.prototype.updateWord = function (word) {
        return this.http.put(this.wordsUrl + '/' + word.text, JSON.stringify({ word: word }), { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    WordService.prototype.deleteWord = function (word) {
        return this.http.delete(this.wordsUrl + '/' + word.text, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    WordService.prototype.getDummyWord = function () {
        var dummyWord = {
            id: null,
            text: null,
            needsToBeReviewed: 10,
            pronunciations: [],
            entries: []
        };
        return dummyWord;
    };
    WordService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    WordService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    WordService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WordService);
    return WordService;
}());
exports.WordService = WordService;
//# sourceMappingURL=word.service.js.map