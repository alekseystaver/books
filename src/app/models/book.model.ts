export interface Book {
  id: number;
  name: string;
  type: 'Design Book' | 'Item Schedule' | 'Installation Book';
  size: string;
  createdAt: Date;
  pages: number;
}
