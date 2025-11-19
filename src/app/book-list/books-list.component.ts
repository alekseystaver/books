import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: false,
})
export class BooksListComponent implements OnInit, OnDestroy {
  public searchControl = new FormControl('');

  protected readonly searchText$ = new BehaviorSubject<string>(''); 
  protected filteredBooks$!: Observable<Book[]>;

  private subscrintion!: Subscription;

  constructor(private readonly bookService: BookService) {}

  public ngOnInit(): void {
    this.bookService.loadBooks();

    this.subscrintion = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
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

  public ngOnDestroy(): void {
    if(this.subscrintion) {
      this.subscrintion.unsubscribe()
    }
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