import { NgModule }               from '@angular/core'
import { BrowserModule }          from '@angular/platform-browser'
import { FormsModule, FormBuilder,
         ReactiveFormsModule }    from '@angular/forms'
import { HttpModule, JsonpModule }from '@angular/http'

import { AppRoutingModule }       from './app-routing.module'

import { DayPipe }                from './day.pipe'

import { AppComponent }           from './app.component'
import { PlayComponent }          from './play_component/play.component'
import { HeaderComponent }        from './header.component'
import { WordListComponent }      from './list_component/word-list.component'
import { WordNewComponent }       from './word_component/word-new.component'
import { WordDetailComponent }    from './word_component/word-detail.component'
import { ResultsPageComponent }   from './play_component/results-page.component'
import { WordFormComponent }      from './form_component/word-form.component'

import { WordService }            from './word.service'

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
  ],
  declarations: [
    DayPipe,
    AppComponent,
    PlayComponent,
    HeaderComponent,
    WordNewComponent,
    WordListComponent,
    WordFormComponent,
    WordDetailComponent,
    ResultsPageComponent,
  ],
  providers: [ WordService, FormBuilder ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
