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
var play_component_1 = require('./play_component/play.component');
var word_list_component_1 = require('./list_component/word-list.component');
var word_form_component_1 = require('./form_component/word-form.component');
var word_new_component_1 = require('./word_component/word-new.component');
var word_detail_component_1 = require('./word_component/word-detail.component');
var routes = [
    { path: '', redirectTo: '/new', pathMatch: 'full' },
    { path: 'new', component: word_new_component_1.WordNewComponent },
    { path: 'add', component: word_form_component_1.WordFormComponent },
    { path: 'list', component: word_list_component_1.WordListComponent },
    { path: 'play/:list', component: play_component_1.PlayComponent },
    { path: 'word/:text', component: word_detail_component_1.WordDetailComponent },
    { path: 'word/:text/edit', component: word_form_component_1.WordFormComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map