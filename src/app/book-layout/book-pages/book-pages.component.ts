import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { LoadBooks } from '../../store/book.actions';
import { BookSelectors } from '../../store/book.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-pages',
  imports: [RouterModule],
  templateUrl: './book-pages.component.html',
  styleUrl: './book-pages.component.scss'
})
export class BookPagesComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);
  private readonly id = computed(() => Number(this.params()?.get('id') ?? 0));
  private readonly selectorFn = this.store.selectSignal(BookSelectors.getBookId);

  protected book = computed(() => {
    const currentId = this.id();
    const findBook = this.selectorFn();
    return findBook(currentId);
  })

  public ngOnInit(): void {
    this.store.dispatch(new LoadBooks());
  }

  protected openPage(bookId: number, pageIndex: number): void {
    this.router.navigate(['/books', bookId, 'read', pageIndex]);
  }
}