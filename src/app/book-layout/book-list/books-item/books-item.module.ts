import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksItemComponent } from './books-item.component';
import { HighlightPipe } from '../pipe/highlight.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BooksItemComponent, HighlightPipe],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [BooksItemComponent],
})
export class BooksItemModule {}
