import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookPagesComponent } from './book-pages.component';

@NgModule({
  declarations: [
    BookPagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BookPagesComponent
  ]
})
export class BookPagesModule { }