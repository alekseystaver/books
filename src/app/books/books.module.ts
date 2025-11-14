import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksItemComponent } from './books-item/books-item.component';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../pipe/highlight.pipe';
import { AutofocusDirective } from '../directive/autofocus.directive';
import { BookCountPageComponent } from './book-count-page/book-count-page.component';

@NgModule({
  declarations: [
    BooksListComponent,
    BooksItemComponent,
    HighlightPipe,
    AutofocusDirective,
    BookCountPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HighlightPipe,
    AutofocusDirective
  ]
})
export class BooksModule {}
