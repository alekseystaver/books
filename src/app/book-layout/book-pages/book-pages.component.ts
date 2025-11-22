import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-pages',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-pages.component.html',
  styleUrl: './book-pages.component.scss'
})
export class BookPagesComponent implements OnInit {
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