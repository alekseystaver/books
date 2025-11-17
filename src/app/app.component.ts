import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly router: Router) {}

  public goToBookList(): void {
    this.router.navigate(['/']);
  }
}
