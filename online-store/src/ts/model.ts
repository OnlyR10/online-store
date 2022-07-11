import type { IBook, IEvents } from './interfaces';
import type Library from './library';

export default class Model {
    books: IBook[] = this.library.getBooks();

    constructor(public library: Library, public events = {} as IEvents) {
        this.events.booksSorted = new Event('booksSorted');
    }

    sort(key: 'name' | 'releaseDateBook', method: 'asc' | 'desc'): void {
        if (method === 'asc') {
            this.books.sort((a: IBook, b: IBook): number => {
                if (a[key] > b[key]) {
                    return 1;
                } else if (a[key] === b[key]) {
                    return 0;
                } else {
                    return -1;
                }
            });
        } else {
            this.books.sort((a: IBook, b: IBook): number => {
                if (a[key] < b[key]) {
                    return 1;
                } else if (a[key] === b[key]) {
                    return 0;
                } else {
                    return -1;
                }
            });
        }
        document.dispatchEvent(this.events.booksSorted);
    }
}
