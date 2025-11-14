import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../services/book.service'; 

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  standalone: false
})
export class BooksListComponent implements OnInit {
  public books: Book[] = [];
  public filteredBooks: Book[] = [];
  public searchText: string = '';
  public shouldHighlight: boolean = false;

  constructor(private bookService: BookService) {}

  public ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.filteredBooks = [...this.books];
  }

  public onSearch() {
    this.shouldHighlight = true;
    this.filteredBooks = this.bookService.searchBooks(this.searchText);
  }
  public onInputChange() {
    this.shouldHighlight = false;
  }

  public createBook() {
    this.bookService.addBook();
    this.filteredBooks = this.bookService.getBooks();
  }

  public deleteBook(id: number) {
    this.bookService.deleteBook(id);
    this.filteredBooks = this.bookService.getBooks();
  }
}
