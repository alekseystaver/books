import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCountPageComponent } from './book-count-page/book-count-page.component';

@NgModule({
  declarations: [
    BookCountPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BookCountPageComponent
  ]
})
export class BookCountModule { }