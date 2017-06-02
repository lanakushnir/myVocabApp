import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { WordService }       from '../word.service';
import { DayPipe }           from '../day.pipe';
import { List }              from '../word';

@Component({
  moduleId: module.id,
  selector: 'word-list',
  templateUrl: './word-list.component.html'
})
export class WordListComponent implements OnInit {
  errorMessage: string
  lists: List[] = []
  listsLength: number = this.lists.length

  constructor (private router: Router, private wordService: WordService) {}

  ngOnInit() { this.getLists(); }

  getLists() {
    this.wordService.getLists()
                     .subscribe((lists: List[]) => this.assignLists(lists),
                                (error: any) =>  this.errorMessage = <any>error);
  }
  assignLists(lists: List[]) {
    this.lists = lists
    this.listsLength = this.lists.length;
  }

  playList(list: List) {
    this.router.navigate(['/play/' + list.date]);
  }

}
