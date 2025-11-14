import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'books-efficiently';

  constructor(private router: Router){}

    public goToBookList() {
    this.router.navigate(['/']);
  }
}
