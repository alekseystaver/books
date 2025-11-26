import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { BookSelectors } from '../../store/book.selectors';
import { map, switchMap } from 'rxjs';

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

  protected readonly book = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id') ?? 0)),
      switchMap(id => this.store.select(BookSelectors.bookId(id)))
    )
  );

  protected openPage(bookId: number, pageIndex: number): void {
    this.router.navigate(['/books', bookId, 'read', pageIndex]);
  }
}