import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { BookSelectors } from '../../store/book.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-pages',
  imports: [RouterModule],
  templateUrl: './book-pages.component.html',
  styleUrl: './book-pages.component.scss'
})
export class BookPagesComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);
  private readonly id = computed(() => Number(this.params()?.get('id') ?? 0));
  private readonly selectorFn = this.store.selectSignal(BookSelectors.bookId);

  protected book = computed(() => {
    const currentId = this.id();
    const findBook = this.selectorFn();
    return findBook(currentId);
  })

  protected openPage(bookId: number, pageIndex: number): void {
    this.router.navigate(['/books', bookId, 'read', pageIndex]);
  }
}