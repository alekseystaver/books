import { Component, DestroyRef, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../models/book.model';
import { BookService } from '../../services/book.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BooksItemComponent } from './books-item/books-item.component';
import { AutofocusDirective } from './directive/autofocus.directive';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BooksItemComponent, AutofocusDirective]
})
export class BooksListComponent implements OnInit {
  public searchControl = new FormControl('');

  protected readonly searchText$ = new BehaviorSubject<string>(''); 
  protected filteredBooks$!: Observable<Book[]>;

  constructor(private readonly bookService: BookService, private readonly destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    this.bookService.loadBooks();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.searchText$.next(value || '');
    });

    this.filteredBooks$ = combineLatest([
      this.bookService.books$,
      this.searchText$ 
    ]).pipe(
      map(([books, term]) => this.filterBooks(books, term))
    );
  }

  protected onSearch(term: string): void {
    this.searchText$.next(term);
  }

  protected createBook(): void {
    this.bookService.addBook();
  }

  protected deleteBook(id: number): void {
    this.bookService.deleteBook(id);
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