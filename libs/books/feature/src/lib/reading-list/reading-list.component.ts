import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, updateFromReadingList } from '@tmo/books/data-access';
import {formatDate} from '@angular/common';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  bookFinished(item) {
    // update book in reading list
    item.finishedDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.store.dispatch(updateFromReadingList({ item }));
  }
}
