import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books-item',
  standalone: false,
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.css']
})
export class BooksItemComponent {
  @Input() public book!: Book;
  @Input() public searchText: string = '';
  @Input() public shouldHighlight: boolean = false;
  @Output() public delete = new EventEmitter<number>();
  
  public isMenuOpen: boolean = false;

  @HostListener('document:click')
  public closeMenuOnOutsideClick(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  public toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  public closeMenu(): void {
    this.isMenuOpen = false;
  }

  public onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.book.id);
    this.closeMenu();
  }
}