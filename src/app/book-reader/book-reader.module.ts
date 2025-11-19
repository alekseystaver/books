import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReaderComponent } from './book-reader.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BookReaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BookReaderModule { }
