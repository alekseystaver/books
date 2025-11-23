import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../store/book.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BooksItemComponent } from './books-item/books-item.component';
import { AutofocusDirective } from './directive/autofocus.directive';
import { Store } from '@ngxs/store';
import { AddBook, DeleteBook, LoadBooks } from '../../store/book.actions';
import { BookState } from '../../store/book.state';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BooksItemComponent, AutofocusDirective]
})
export class BooksListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly  destroyRef = inject(DestroyRef)

  public searchControl = new FormControl('');

  protected readonly searchText$ = new BehaviorSubject<string>(''); 
  protected filteredBooks$!: Observable<Book[]>;

  public ngOnInit(): void {
    this.store.dispatch(new LoadBooks());

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.searchText$.next(value || '');
    });

    this.filteredBooks$ = combineLatest([
      this.store.select(BookState.getBooks),
      this.searchText$ 
    ]).pipe(
      map(([books, term]) => this.filterBooks(books, term))
    );
  }

  protected onSearch(term: string): void {
    this.searchText$.next(term);
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