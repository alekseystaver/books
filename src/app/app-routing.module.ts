import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCountPageComponent } from './book-count/book-count-page/book-count-page.component';
import { BooksListComponent } from './books/books-list/books-list.component';

const routes: Routes = [
  {path: '', component: BooksListComponent},
  {path: 'book-count', component: BookCountPageComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
