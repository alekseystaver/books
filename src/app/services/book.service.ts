import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, BookType } from '../store/book.model'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly types = Object.values(BookType);
  private readonly http = inject(HttpClient); 

  public fetchBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/assets/data.json').pipe(
      map(books => books.map(book => ({
        ...book,
        createdAt: new Date(book.createdAt)
      })))
    )
  }

  public createRandomBook(id: number): Book {
    const type = this.types[Math.floor(Math.random() * this.types.length)];
    return {
      id,
      name: `New book ${Math.floor(Math.random() * 1000)}`,
      type,
      size: `${Math.floor(Math.random() * 150) + 100} KB`,
      createdAt: new Date(),
      pages: Math.floor(Math.random() * 5) + 1
    };
  }
}
