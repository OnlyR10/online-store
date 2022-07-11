import type { IBook } from './interfaces';
import type Library from './library';

export default class Model {
    private _books: IBook[] = this.library.getBooks();
    selectKey: 'name' | 'releaseDateBook' | null;
    selectMethod: 'asc' | 'desc' | null;

    constructor(private library: Library) {
        this.selectKey = null;
        this.selectMethod = null;
    }

    get books() {
        return this._books.slice();
    }

    sort(key: 'name' | 'releaseDateBook', method: 'asc' | 'desc'): void {
        if (method === 'asc') {
            this._books.sort((a: IBook, b: IBook): number => {
                if (a[key] > b[key]) {
                    return 1;
                } else if (a[key] === b[key]) {
                    return 0;
                } else {
                    return -1;
                }
            });
        } else {
            this._books.sort((a: IBook, b: IBook): number => {
                if (a[key] < b[key]) {
                    return 1;
                } else if (a[key] === b[key]) {
                    return 0;
                } else {
                    return -1;
                }
            });
        }
        this.selectKey = key;
        this.selectMethod = method;
        document.dispatchEvent(new Event('ModelUpdate'));
    }

    search(inputValue: string): void {
        const allBooks = this.library.getBooks();
        if (!inputValue) {
            this._books = allBooks;
        } else {
            this._books = allBooks.filter((el) => el.name.includes(inputValue));
        }
        if (this.selectKey && this.selectMethod) {
            this.sort(this.selectKey, this.selectMethod);
        }
        document.dispatchEvent(new Event('ModelUpdate'));
    }
}
