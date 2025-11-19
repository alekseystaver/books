import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-page',
  standalone: false,
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss'
})
export class BookPageComponent implements OnInit {
  protected book$!: Observable<Book | undefined>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  public ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.bookService.getBookById(id);
      })
    );
  }

  protected openPage(bookId: number, pageIndex: number): void {
    this.router.navigate(['/books', bookId, 'read', pageIndex]);
  }
}