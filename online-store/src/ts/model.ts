import type { IBook } from './interfaces';
import type Library from './library';

export default class Model {
    private _books: IBook[] = this.library.getBooks();
    private selectKey: 'name' | 'releaseDateBook' | null;
    private selectMethod: 'asc' | 'desc' | null;
    basket: IBook[];

    constructor(private library: Library) {
        this.selectKey = null;
        this.selectMethod = null;
        this.basket = [];
    }

    get books() {
        return this._books.slice();
    }

    addToBasket(book: IBook) {
        this.basket.push(book);
        document.dispatchEvent(new Event('ModelUpdate'));
    }

    removeFromBasket(book: IBook) {
        this.basket.splice(this.basket.indexOf(book), 1);
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
