import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Subscription, from } from 'rxjs';
import { removeFromReadingList } from '@tmo/books/data-access';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  // private _select;
  _select: Subscription;
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private _snackBar: MatSnackBar,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this._select = this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  openSnackBar(message: string, action: string, item: ReadingListItem, book: Book) {
    let snackBarRef = this._snackBar.open(message, action, {duration: 2000});
    let isAdded = true;
    
    snackBarRef.onAction().subscribe(() => {
      isAdded = false;
      this.store.dispatch(removeFromReadingList({ item }));
    });


    snackBarRef.afterDismissed().subscribe(() => {
      if (isAdded) {
        this.store.dispatch(addToReadingList({ book }));
      } else {
        this.store.dispatch(removeFromReadingList({ item }));
      }
    });
    
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy() {
    if (this._select) {
      this._select.unsubscribe()
    }
  }
}
