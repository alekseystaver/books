import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { LoadBooks } from '../store/book.actions';
import { BookSelectors } from '../store/book.selectors';

@Component({
  selector: 'app-book-count-page',
  imports: [CommonModule],
  templateUrl: './book-count-page.component.html',
  styleUrls: ['./book-count-page.component.scss'],
})
export class BookCountPageComponent implements OnInit{
  private readonly store = inject(Store);

  protected readonly bookCount$: Observable<number> =this.store.select(BookSelectors.getBooksCount);

  ngOnInit(): void {
    this.store.dispatch(new LoadBooks());
  }
}