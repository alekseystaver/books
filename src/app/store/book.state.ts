import { inject, Injectable } from "@angular/core";
import { Book, BookStateModel } from "./book-state.model";
import {Action, State, StateContext} from '@ngxs/store'
import { BookService } from "../services/book.service";
import { AddBook, DeleteBook, LoadBooks } from "./book.actions";
import { Observable, tap } from "rxjs";
import { append, patch } from "@ngxs/store/operators";

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

    @Action(LoadBooks)
    public loadBooks({ getState, patchState } : StateContext<BookStateModel>): Observable<Book[]> | void {
        const state = getState();

        if (state.books.length) {
          return;
        }

        patchState({ loading: true });
        return this.bookService.fetchBooks().pipe(
            tap(result =>{
                patchState({
                    books: result,
                    loading: false
                })
            })
        )
    }

    @Action(AddBook)
    public addBook({ setState } : StateContext<BookStateModel>) {
        const newBook = this.bookService.createRandomBook(Date.now());
        setState(
            patch({
                books: append([newBook])
            })
        )
    }

    @Action(DeleteBook)
    public deleteBook({ getState, patchState } : StateContext<BookStateModel>, action: DeleteBook) {
        const state = getState();
        const filteredBooks = state.books.filter(book => book.id !== action.id);

        patchState({
            books: filteredBooks
        })
    }
}