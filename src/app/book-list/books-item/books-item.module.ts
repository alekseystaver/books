import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksItemComponent } from './books-item.component';
import { HighlightPipe } from '../pipe/highlight.pipe';

@NgModule({
  declarations: [BooksItemComponent, HighlightPipe],
  imports: [CommonModule],
  exports: [BooksItemComponent],
})
export class BooksItemModule {}
