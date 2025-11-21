import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.scss'],
  standalone: false,
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
