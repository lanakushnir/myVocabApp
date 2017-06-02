import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DayPipe } from '../day.pipe';
import { List }    from '../word';

@Component({
  moduleId: module.id,
  selector: 'results-page',
  templateUrl: './results-page.component.html'
})
export class ResultsPageComponent {

  @Input() list: List;
  @Output() playMore: EventEmitter<boolean> = new EventEmitter();

  toPlayAgain() {
    this.playMore.emit( true );
  }
}
