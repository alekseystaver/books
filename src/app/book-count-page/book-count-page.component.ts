import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-count-page',
  imports: [CommonModule],
  templateUrl: './book-count-page.component.html',
  styleUrls: ['./book-count-page.component.scss'],
})
export class BookCountPageComponent {
  protected readonly bookCount$!: Observable<number>;

  constructor(private readonly bookService: BookService) {
    this.bookCount$ = this.bookService.getBooksCount();
  }
}