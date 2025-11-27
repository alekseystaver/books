export enum BookType {
  DESIGN_BOOK = 'Design Book',
  ITEM_SCHEDULE = 'Item Schedule',
  INSTALLATION_BOOK = 'Installation Book'
}

export interface Book {
  id: number;
  name: string;
  type: BookType;
  size: string;
  createdAt: Date;
  pages: number;
}

export interface BookStateModel {
    books: Book[];
    loading: boolean;
}