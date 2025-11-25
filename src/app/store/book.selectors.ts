import { Selector } from "@ngxs/store";
import { BookState } from "./book.state";
import { BookStateModel } from "./book-state.model";

export class BookSelectors {
    @Selector([BookState]) 
    public static books(state: BookStateModel) {
        return state.books;
    }

    @Selector([BookState])
    public static booksCount(state: BookStateModel) {
        return state.books.length;
    }

    @Selector([BookState]) 
    public static isLoading(state: BookStateModel) {
        return state.loading;
    }

    @Selector([BookState]) 
    public static bookId(state: BookStateModel) {
        return (id: number) => state.books.find(book => book.id === id);
    }
}
