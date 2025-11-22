import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterLink]
})
export class AppComponent {

  constructor(private readonly router: Router) {}

  protected goToBookList(): void {
    this.router.navigate(['/']);
  }
}
