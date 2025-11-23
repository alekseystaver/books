import { inject, Injectable } from "@angular/core";
import { Book } from "./book.model";
import {Action, Selector, State, StateContext} from '@ngxs/store'
import { BookService } from "../services/book.service";
import { AddBook, DeleteBook, LoadBooks } from "./book.actions";
import { Observable, tap } from "rxjs";

export interface BookStateModel {
    books: Book[];
    loading: boolean;
}

@State<BookStateModel>({
    name: 'bookState',
    defaults: {
        books: [],
        loading: false
    }
})
@Injectable() 
export class BookState {

    private readonly bookService = inject(BookService);

    @Selector() 
    public static getBooks(state: BookStateModel) {
        return state.books;
    }

    @Selector()
    public static getBooksCount(state: BookStateModel) {
        return state.books.length;
    }

    @Selector() 
    public static isLoading(state: BookStateModel) {
        return state.loading;
    }

    @Selector() 
    public static getBookId(state: BookStateModel) {
        return (id: number) => state.books.find(book => book.id === id);
    }

    @Action(LoadBooks)
    public loadBooks(ctx: StateContext<BookStateModel>): Observable<Book[]> | void {
        const state = ctx.getState();

        if (state.books.length > 0) {
          return;
        }

        ctx.patchState({ loading: true });
        return this.bookService.fetchBooks().pipe(
            tap(result =>{
                ctx.patchState({
                    books: result,
                    loading: false
                })
            })
        )
    }

    @Action(AddBook)
    public addBook(ctx: StateContext<BookStateModel>) {
        const newBook = this.bookService.createRandomBook(Date.now());
        const state = ctx.getState();
        ctx.patchState({
            books: [...state.books, newBook]
        });
    }

    @Action(DeleteBook)
    public deleteBook(ctx: StateContext<BookStateModel>, action: DeleteBook) {
        const state = ctx.getState();
        const filteredBooks = state.books.filter(book => book.id !== action.id);

        ctx.patchState({
            books: filteredBooks
        })
    }
}