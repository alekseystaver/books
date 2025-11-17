import { Injectable } from '@angular/core';
import { Book, BookType } from '../models/book.model'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _books = new BehaviorSubject<Book[]>([]);
  public readonly books$: Observable<Book[]> = this._books;

  private types = Object.values(BookType); 
  private count: number = 1;

  private createRandomBook(id: number): Book {
    const type = this.types[Math.floor(Math.random() * this.types.length)];
    return {
      id,
      name: `${type} ${this.count++}`,
      type,
      size: `${Math.floor(Math.random() * 150) + 100} KB`,
      createdAt: new Date(Date.now()),
      pages: Math.floor(Math.random() * 5) + 1
    };
  }

  public initializeBooks(): void {
    const currentBooks = this._books.getValue();
    if (currentBooks.length > 0) {
      return;
    }

    const initialBooks: Book[] = [];
    for (let i = 0; i <= 5; i++) {
      initialBooks.push(this.createRandomBook(i));
    }
    this._books.next(initialBooks);
  }

  public getBooks(): Observable<Book[]> {
    return this.books$;
  }

  public addBook(): void {
    const newBook = this.createRandomBook(Date.now());
    const updatedBooks = [...this._books.getValue(), newBook];
    this._books.next(updatedBooks);
  }

  public deleteBook(id: number): void {
    const updatedBooks = this._books.getValue().filter(book => book.id !== id);
    this._books.next(updatedBooks);
  }

  public getBooksCount(): Observable<number> {
    return this.books$.pipe(map(books => books.length));
  }

  public searchBooks(term: string): Observable<Book[]> {
    const trimmedLowerCaseTerm = term.trim().toLowerCase();

    return this.books$.pipe(
      map(books => {
        if (!trimmedLowerCaseTerm) {
          return [...books];
        }
        return books.filter(book =>
          book.name.toLowerCase().includes(trimmedLowerCaseTerm)
        );
      })
    );
  }
}