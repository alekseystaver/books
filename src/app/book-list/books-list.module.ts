import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list.component';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from './directive/autofocus.directive';
import { BooksItemModule } from './books-item/books-item.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksListComponent,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksItemModule,
    ReactiveFormsModule
  ],
  exports: [
    AutofocusDirective
  ]
})
export class BooksListModule {}
