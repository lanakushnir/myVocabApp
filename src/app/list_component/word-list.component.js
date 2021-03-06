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
var WordListComponent = (function () {
    function WordListComponent(router, wordService) {
        this.router = router;
        this.wordService = wordService;
        this.lists = [];
        this.listsLength = this.lists.length;
    }
    WordListComponent.prototype.ngOnInit = function () { this.getLists(); };
    WordListComponent.prototype.getLists = function () {
        var _this = this;
        this.wordService.getLists()
            .subscribe(function (lists) { return _this.assignLists(lists); }, function (error) { return _this.errorMessage = error; });
    };
    WordListComponent.prototype.assignLists = function (lists) {
        this.lists = lists;
        this.listsLength = this.lists.length;
    };
    WordListComponent.prototype.playList = function (list) {
        this.router.navigate(['/play/' + list.date]);
    };
    WordListComponent.prototype.deleteWord = function (word, event) {
        var _this = this;
        this.wordService.deleteWord(word)
            .subscribe(function (result) { return event.target.parentElement.remove(); }, function (error) { return _this.errorMessage = error; });
    };
    WordListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'word-list',
            templateUrl: './word-list.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, word_service_1.WordService])
    ], WordListComponent);
    return WordListComponent;
}());
exports.WordListComponent = WordListComponent;
//# sourceMappingURL=word-list.component.js.map