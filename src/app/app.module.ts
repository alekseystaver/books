import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BooksListModule } from './book-list/books-list.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BookCountModule } from './book-count-page/book-count.module';
import { BookPageModule } from './book-page/book-page.module';
import { BookReaderModule } from './book-reader/book-reader.module';
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BooksListModule,
    AppRoutingModule,
    BookCountModule,
    BookPageModule,
    BookReaderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
