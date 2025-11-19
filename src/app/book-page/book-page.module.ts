import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookPageComponent } from './book-page.component';

@NgModule({
  declarations: [
    BookPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BookPageComponent
  ]
})
export class BookPageModule { }