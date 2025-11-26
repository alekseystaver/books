import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Book } from '../../store/book-state.model';
import { AddBook, DeleteBook } from '../../store/book.actions';
import { BookSelectors } from '../../store/book.selectors';
import { BooksItemComponent } from './books-item/books-item.component';
import { AutofocusDirective } from './directive/autofocus.directive';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  imports: [ ReactiveFormsModule, BooksItemComponent, AutofocusDirective]
})
export class BooksListComponent{
  private readonly store = inject(Store);
  private readonly books = this.store.selectSignal(BookSelectors.books);

  public searchControl = new FormControl('', {nonNullable: true});

  protected readonly searchText = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ), 
    { initialValue: ''}
  ); 

  protected filteredBooks = computed(() => {
    return this.filterBooks(this.books(), this.searchText() ?? '');
  });

  protected createBook(): void {
    this.store.dispatch(new AddBook());
  }

  protected deleteBook(id: number): void {
    this.store.dispatch(new DeleteBook(id));
  }

  protected filterBooks(books: Book[], searchValue: string): Book[] {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return books;
    }

    return books.filter(book =>
      book.name.toLowerCase().includes(normalizedSearchValue)
    );
  }
}