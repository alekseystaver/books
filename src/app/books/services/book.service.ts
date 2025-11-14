import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [];
  private types = ['Design Book', 'Item Schedule', 'Installation Book'] as const;
  private count: number = 1;

  constructor() {
    this.generateInitialBooks();
  }

  private generateInitialBooks() {
    for (let i = 0; i <= 5; i++) {
      this.books.push(this.createRandomBook(i));
    }
  }

  private createRandomBook(id: number): Book {
    const type = this.types[Math.floor(Math.random() * this.types.length)] as Book['type'];
    return {
      id,
      name: `${type} ${this.count++}`,
      type,
      size: `${Math.floor(Math.random() * 150) + 100} KB`,
      createdAt: new Date(Date.now()),
      pages: Math.floor(Math.random() * 200) + 50
    };
  }

  public getBooks(): Book[] {
    return [...this.books];
  }

  public addBook(): Book {
    const newBook = this.createRandomBook(Date.now());
    this.books.push(newBook);
    return newBook;
  }

  public deleteBook(id: number) {
    this.books = this.books.filter(book => book.id !== id);
  }

  public getBooksCount(): number{
    return this.books.length;
  }

  public searchBooks(term: string): Book[] {
    if (!term.trim()) return [...this.books];
    term = term.toLowerCase();
    return this.books.filter(book => book.name.toLowerCase().includes(term));
  }
}
