import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-count-page',
  standalone: false,
  templateUrl: './book-count-page.component.html',
  styleUrl: './book-count-page.component.css'
})
export class BookCountPageComponent implements OnInit{
  public bookCount: number | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookCount = this.bookService.getBooksCount();
  }
}
