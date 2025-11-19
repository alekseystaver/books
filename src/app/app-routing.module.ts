import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCountPageComponent } from './book-count-page/book-count-page.component';
import { BooksListComponent } from './book-list/books-list.component';
import { BookPageComponent } from './book-page/book-page.component';
import { BookReaderComponent } from './book-reader/book-reader.component';

const routes: Routes = [
  {path: '', component: BooksListComponent},
  {path: 'book-count', component: BookCountPageComponent},
  {path: 'books/:id', component: BookPageComponent},
  {path: 'books/:id/read/:pageIndex', component: BookReaderComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
