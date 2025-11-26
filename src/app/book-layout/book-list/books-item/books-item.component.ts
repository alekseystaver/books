import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Book } from '../../../store/book-state.model';
import { HighlightPipe } from '../pipe/highlight.pipe';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.scss'],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, HighlightPipe]
})
export class BooksItemComponent {
  public readonly book = input.required<Book>();
  public readonly searchText= input<string>();

  public readonly delete = output<number>();

  protected readonly highlightColor = 'orange';

  constructor(private readonly router: Router) {}

  protected onDelete(): void {
    this.delete.emit(this.book().id);
  }

  protected navigateToBook(): void {
    this.router.navigate(['/books', this.book().id]); 
  }
}
