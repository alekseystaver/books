import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Book } from '../../store/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { LoadBooks } from '../../store/book.actions';
import { BookState } from '../../store/book.state';

@Component({
  selector: 'app-book-pages',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-pages.component.html',
  styleUrl: './book-pages.component.scss'
})
export class BookPagesComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected book$!: Observable<Book | undefined>;

  public ngOnInit(): void {
    this.store.dispatch(new LoadBooks());

    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.store.select(BookState.getBookId).pipe(
          map(findFn => findFn(id))
        );
      })
    );
  }

  protected openPage(bookId: number, pageIndex: number): void {
    this.router.navigate(['/books', bookId, 'read', pageIndex]);
  }
}