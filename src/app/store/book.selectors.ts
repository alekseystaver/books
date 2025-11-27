import { createSelector, Selector } from "@ngxs/store";
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
    public static loading(state: BookStateModel) {
        return state.loading;
    }

    public static bookId(id: number) {
        return createSelector([BookState], (state: BookStateModel)=> {
            return state.books.find(book => book.id === id);
        })
    }
}
