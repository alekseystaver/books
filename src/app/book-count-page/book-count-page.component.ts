import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { BookSelectors } from '../store/book.selectors';

@Component({
  selector: 'app-book-count-page',
  templateUrl: './book-count-page.component.html',
  styleUrls: ['./book-count-page.component.scss'],
})
export class BookCountPageComponent{
  private readonly store = inject(Store);

  protected readonly bookCount = this.store.selectSignal(BookSelectors.booksCount);
}