import { Component } from '@angular/core'

@Component({
  selector: 'header',
  template: `
    <div class="nav">
      <div routerLink="/new">NEW</div>
      <div routerLink="/list">LIST</div>
      <div routerLink="/add">ADD</div>
    </div>
  `
})
export class HeaderComponent {
  // <p>myVocabApp</p>
}
