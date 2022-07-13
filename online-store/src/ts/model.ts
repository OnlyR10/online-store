import type { IBook } from './interfaces';

export default class Model {
    private _books: IBook[] = this.bookLibrary;
    private selectKey: 'name' | 'releaseDateBook' | null = null;
    private selectMethod: 'asc' | 'desc' | null = null;
    private _basket: IBook[] = [];
    public basketFull = false;
    public searchMatch = true;

    constructor(private bookLibrary: IBook[]) {}

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
        document.dispatchEvent(
            new CustomEvent('ModelUpdate', {
                detail: 'add',
            })
        );
    }

    removeFromBasket(book: IBook) {
        if (this.basket.length === 2) {
            this.basketFull = false;
        }
        this._basket.splice(this._basket.indexOf(book), 1);
        document.dispatchEvent(
            new CustomEvent('ModelUpdate', {
                detail: 'remove',
            })
        );
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
        document.dispatchEvent(
            new CustomEvent('ModelUpdate', {
                detail: 'sort',
            })
        );
    }

    search(inputValue: string): void {
        const allBooks: IBook[] = this.bookLibrary;
        if (!inputValue) {
            this._books = allBooks;
        } else {
            this._books = allBooks.filter((el: IBook): boolean =>
                el.name.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
        this.searchMatch = Boolean(this._books.length);
        if (this.selectKey && this.selectMethod) {
            this.sort(this.selectKey, this.selectMethod);
        } else {
            document.dispatchEvent(
                new CustomEvent('ModelUpdate', {
                    detail: 'search',
                })
            );
        }
    }
}
