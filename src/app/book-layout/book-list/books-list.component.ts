import { Component, computed, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../store/book.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BooksItemComponent } from './books-item/books-item.component';
import { AutofocusDirective } from './directive/autofocus.directive';
import { Store } from '@ngxs/store';
import { AddBook, DeleteBook, LoadBooks } from '../../store/book.actions';
import { BookSelectors } from '../../store/book.selectors';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  imports: [ ReactiveFormsModule, BooksItemComponent, AutofocusDirective]
})
export class BooksListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly books = this.store.selectSignal(BookSelectors.getBooks);

  public searchControl = new FormControl('');

  protected readonly searchText = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ), 
    { initialValue: ''}
  ); 

  protected filteredBooks = computed(() => {
    const books = this.books();
    const term = this.searchText() ?? '';
    return this.filterBooks(books, term);
  });

  public ngOnInit(): void {
    this.store.dispatch(new LoadBooks());
  }

  protected createBook(): void {
    this.store.dispatch(new AddBook());
  }

  protected deleteBook(id: number): void {
    this.store.dispatch(new DeleteBook(id));
  }

  protected filterBooks(books: Book[], term: string): Book[] {
    const normalizedTerm = term.trim().toLowerCase();

    if (!normalizedTerm) {
      return books;
    }

    return books.filter(book =>
      book.name.toLowerCase().includes(normalizedTerm)
    );
  }
}