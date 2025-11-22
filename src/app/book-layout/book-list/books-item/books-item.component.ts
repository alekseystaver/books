import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HighlightPipe } from '../pipe/highlight.pipe';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.scss'],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, HighlightPipe]
})
export class BooksItemComponent {
  @Input() public book!: Book;
  @Input() public searchText: string | null = '';

  @Output() public readonly delete = new EventEmitter<number>();

  protected readonly highlightColor = 'orange';

  constructor(private readonly router: Router) {}

  protected onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.book.id);
  }

  protected navigateToBook(): void {
    this.router.navigate(['/books', this.book.id]); 
  }
}
