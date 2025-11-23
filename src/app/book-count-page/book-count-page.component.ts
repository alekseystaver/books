import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { BookState } from '../store/book.state';
import { LoadBooks } from '../store/book.actions';

@Component({
  selector: 'app-book-count-page',
  imports: [CommonModule],
  templateUrl: './book-count-page.component.html',
  styleUrls: ['./book-count-page.component.scss'],
})
export class BookCountPageComponent implements OnInit{
  private readonly store = inject(Store);

  protected readonly bookCount$: Observable<number> =this.store.select(BookState.getBooksCount);

  ngOnInit(): void {
    this.store.dispatch(new LoadBooks());
  }
}