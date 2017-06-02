import { Component } from '@angular/core'

@Component({
  selector: 'header',
  template: `
    <div class="nav">
      <div routerLink="/new">NEW</div>
      <div routerLink="/list">LIST</div>
    </div>
    <p>myVocabApp</p>
  `
})
export class HeaderComponent {
}
