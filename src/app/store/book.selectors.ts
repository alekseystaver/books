import { Selector } from "@ngxs/store";
import { BookState, BookStateModel } from "./book.state";

export class BookSelectors {
    @Selector([BookState]) 
    public static getBooks(state: BookStateModel) {
        return state.books;
    }

    @Selector([BookState])
    public static getBooksCount(state: BookStateModel) {
        return state.books.length;
    }

    @Selector([BookState]) 
    public static isLoading(state: BookStateModel) {
        return state.loading;
    }

    @Selector([BookState]) 
    public static getBookId(state: BookStateModel) {
        return (id: number) => state.books.find(book => book.id === id);
    }
}
