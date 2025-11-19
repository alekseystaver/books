import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: false,
})
export class BooksListComponent implements OnInit {
  protected readonly searchText$ = new BehaviorSubject<string>(''); 

  protected filteredBooks$!: Observable<Book[]>;

  constructor(private readonly bookService: BookService) {}

  public ngOnInit(): void {
    this.bookService.initializeBooks();

    this.filteredBooks$ = combineLatest([
      this.bookService.books$,
      this.searchText$.pipe(
        distinctUntilChanged()
      )
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