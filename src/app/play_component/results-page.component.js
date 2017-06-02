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
var word_1 = require('../word');
var ResultsPageComponent = (function () {
    function ResultsPageComponent() {
        this.playMore = new core_1.EventEmitter();
    }
    ResultsPageComponent.prototype.toPlayAgain = function () {
        this.playMore.emit(true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', word_1.List)
    ], ResultsPageComponent.prototype, "list", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ResultsPageComponent.prototype, "playMore", void 0);
    ResultsPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'results-page',
            templateUrl: './results-page.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ResultsPageComponent);
    return ResultsPageComponent;
}());
exports.ResultsPageComponent = ResultsPageComponent;
//# sourceMappingURL=results-page.component.js.map