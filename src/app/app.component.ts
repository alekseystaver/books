import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadBooks } from './store/book.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterLink]
})
export class AppComponent implements OnInit{

  private readonly router = inject(Router);
  private readonly store = inject(Store)

  public ngOnInit(): void {
    this.store.dispatch(new LoadBooks());
  }

  protected goToBookList(): void {
    this.router.navigate(['/']);
  }
}
