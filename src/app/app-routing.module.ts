import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayComponent }        from './play_component/play.component';
import { WordListComponent }    from './list_component/word-list.component';
import { WordFormComponent }    from './form_component/word-form.component';
import { WordNewComponent }     from './word_component/word-new.component';
import { WordDetailComponent }  from './word_component/word-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: 'new',             component: WordNewComponent },
  { path: 'add',             component: WordFormComponent },
  { path: 'list',            component: WordListComponent },
  { path: 'play/:list',      component: PlayComponent },
  { path: 'word/:text',      component: WordDetailComponent },
  { path: 'word/:text/edit', component: WordFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
