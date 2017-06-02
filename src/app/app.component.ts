import { Component } from '@angular/core'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <header></header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
