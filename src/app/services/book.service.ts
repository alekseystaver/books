import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, BookType } from '../models/book.model'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly books = new BehaviorSubject<Book[]>([]);
  private readonly types = Object.values(BookType); 

  private count: number = 1;
  
  public readonly books$: Observable<Book[]> = this.books.asObservable();

  constructor(private http: HttpClient) {}

  public loadBooks(): void {
    this.http.get<Book[]>('/assets/data.json').pipe(
      map(books => books.map(book => ({
        ...book,
        createdAt: new Date(book.createdAt)
      })))
    ).subscribe({
      next: (data) => {
        this.books.next(data);
      },
      error: (err) => console.error(err)
    });
  }

  private createRandomBook(id: number): Book {
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

  public initializeBooks(): void {
    const currentBooks = this.books.getValue();
    if (currentBooks.length > 0) {
      return;
    }

    const initialBooks: Book[] = [];
    for (let i = 0; i <= 5; i++) {
      initialBooks.push(this.createRandomBook(i));
    }
    this.books.next(initialBooks);
  }

  public addBook(): void {
    const newBook = this.createRandomBook(Date.now());
    const updatedBooks = [...this.books.getValue(), newBook];
    this.books.next(updatedBooks);
  }

  public deleteBook(id: number): void {
    const updatedBooks = this.books.getValue().filter(book => book.id !== id);
    this.books.next(updatedBooks);
  }

  public getBooksCount(): Observable<number> {
    return this.books$.pipe(map(books => books.length));
  }

  public getBookById(id: number): Observable<Book | undefined> {
    return this.books$.pipe(
      map(books => books.find(book => book.id === id))
    );
  }
}
