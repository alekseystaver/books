import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, startWith } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: false,
})
export class BooksListComponent implements OnInit {
  public readonly activeSearchTerm$ = new BehaviorSubject<string>('');
  
  public filteredBooks$!: Observable<Book[]>;

  public searchText: string = '';

  constructor(private bookService: BookService) {}

  public ngOnInit(): void {
    this.bookService.initializeBooks();
    this.filteredBooks$ = combineLatest([
      this.bookService.books$,
      this.activeSearchTerm$.pipe(
        distinctUntilChanged(),
        startWith('')
      )
    ]).pipe(
      map(([books, term]) => {
        const trimmedLowerCaseTerm = term.trim().toLowerCase();

        if (!trimmedLowerCaseTerm) {
          return [...books];
        }
        
        return books.filter(book =>
          book.name.toLowerCase().includes(trimmedLowerCaseTerm)
        );
      })
    );
  }

  public onSearch(term: string): void {
    this.activeSearchTerm$.next(this.searchText);
    this.activeSearchTerm$.next(term);
  }

  public createBook(): void {
    this.bookService.addBook();
  }

  public deleteBook(id: number): void {
    this.bookService.deleteBook(id);
  }
}