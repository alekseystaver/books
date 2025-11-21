import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCountPageComponent } from './book-count-page/book-count-page.component';
import { BooksListComponent } from './book-layout/book-list/books-list.component';
import { BookPagesComponent } from './book-layout/book-pages/book-pages.component';
import { BookPageComponent } from './book-layout/book-page/book-page.component';
import { BookLayoutComponent } from './book-layout/book-layout.component';

const routes: Routes = [
  {path: '', component: BookLayoutComponent,
    children: [
      {path: '', component: BooksListComponent},
      {path: 'books/:id/read/:pageIndex', component: BookPageComponent},
      {path: 'books/:id', component: BookPagesComponent}
    ]
  },
  {path: 'book-count', component: BookCountPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
