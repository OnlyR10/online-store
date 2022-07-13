import type { IBook } from './interfaces';
import type Library from './library';

export default class Model {
    private _books: IBook[] = this.library.getBooks();
    private selectKey: 'name' | 'releaseDateBook' | null = null;
    private selectMethod: 'asc' | 'desc' | null = null;
    private _basket: IBook[] = [];
    public basketFull = false;

    constructor(private library: Library) {}

    get books() {
        return this._books.slice();
    }

    get basket() {
        return this._basket.slice();
    }

    addToBasket(book: IBook) {
        if (this.basket.length < 2) {
            this._basket.push(book);
        } else {
            this.basketFull = true;
        }
        document.dispatchEvent(new Event('ModelUpdate'));
    }

    removeFromBasket(book: IBook) {
        if (this.basket.length === 2) {
            this.basketFull = false;
        }
        this._basket.splice(this._basket.indexOf(book), 1);
        document.dispatchEvent(new Event('ModelUpdate'));
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
        const allBooks: IBook[] = this.library.getBooks();
        if (!inputValue) {
            this._books = allBooks;
        } else {
            this._books = allBooks.filter((el: IBook): boolean => el.name.includes(inputValue));
        }
        if (this.selectKey && this.selectMethod) {
            this.sort(this.selectKey, this.selectMethod);
        }
        document.dispatchEvent(new Event('ModelUpdate'));
    }
}
