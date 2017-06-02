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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require('./app-routing.module');
var day_pipe_1 = require('./day.pipe');
var app_component_1 = require('./app.component');
var play_component_1 = require('./play_component/play.component');
var header_component_1 = require('./header.component');
var word_list_component_1 = require('./list_component/word-list.component');
var word_new_component_1 = require('./word_component/word-new.component');
var word_detail_component_1 = require('./word_component/word-detail.component');
var results_page_component_1 = require('./play_component/results-page.component');
var word_form_component_1 = require('./form_component/word-form.component');
var word_service_1 = require('./word.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                app_routing_module_1.AppRoutingModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.JsonpModule,
                http_1.HttpModule,
            ],
            declarations: [
                day_pipe_1.DayPipe,
                app_component_1.AppComponent,
                play_component_1.PlayComponent,
                header_component_1.HeaderComponent,
                word_new_component_1.WordNewComponent,
                word_list_component_1.WordListComponent,
                word_form_component_1.WordFormComponent,
                word_detail_component_1.WordDetailComponent,
                results_page_component_1.ResultsPageComponent,
            ],
            providers: [word_service_1.WordService, forms_1.FormBuilder],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map