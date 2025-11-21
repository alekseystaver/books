import { NgModule } from "@angular/core";
import { BookLayoutComponent } from "./book-layout.component";
import { BookPageModule } from "./book-page/book-page.module";
import { BookPagesModule } from "./book-pages/book-pages.module";
import { BooksListModule } from "./book-list/books-list.module";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    BookLayoutComponent
  ],
  imports: [
    BookPageModule,
    BookPagesModule,
    BooksListModule,
    RouterModule
  ],
  providers: []
})
export class BookLayoutModule {}
