export class LoadBooks {
    public static readonly type = '[BookList] Load Books'
}

export class AddBook {
    public static readonly type = '[BookList] Add Book'
}

export class DeleteBook {
    public static readonly type = '[BookList] Delete Books'
    constructor(public id: number) {} 
}