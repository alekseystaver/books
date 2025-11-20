import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookPageComponent } from './book-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BookPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BookPageModule { }
