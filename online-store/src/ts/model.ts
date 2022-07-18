import type { IBook } from './interfaces';
import filterByActiveGenre from './filterByActiveGenre';
import ModelFilters from './modelFilters';

export default class Model {
    public modelFilters: ModelFilters;
    private _books: IBook[];
    private _basket: IBook[];
    public basketFull: boolean;
    public searchMatch: boolean;
    public selectKey: 'name' | 'releaseDateBook';
    public selectMethod: 'asc' | 'desc';
    private inputValue: string;

    constructor(private bookLibrary: IBook[]) {
        this._books = this.bookLibrary;

        const userSettingsAsString = localStorage.getItem('userSettings');
        if (userSettingsAsString) {
            const storage = JSON.parse(userSettingsAsString);
            this.selectKey = storage.selectKey;
            this.selectMethod = storage.selectMethod;
            this._basket = storage.basket;
            this.basketFull = storage.basketFull;
            this.searchMatch = storage.searchMatch;
        } else {
            this.selectKey = 'name';
            this.selectMethod = 'asc';
            this._basket = [];
            this.basketFull = false;
            this.searchMatch = true;
        }

        this.inputValue = '';
        this.modelFilters = new ModelFilters(this);
        this.all();
    }

    get books() {
        return this._books.slice();
    }

    get basket() {
        return this._basket.slice();
    }

    addToBasket(book: IBook) {
        if (this.basket.length < 20) {
            this._basket.push(book);
        } else {
            this.basketFull = true;
        }
        this.saveToLocalStorage();
        document.dispatchEvent(
            new CustomEvent('ModelUpdate', {
                detail: 'add',
            })
        );
    }

    removeFromBasket(book: IBook) {
        if (this.basket.length === 20) {
            this.basketFull = false;
        }
        const target = this._basket.findIndex((elem) => elem.name === book.name);
        this._basket.splice(target, 1);
        this.saveToLocalStorage();
        document.dispatchEvent(
            new CustomEvent('ModelUpdate', {
                detail: 'remove',
            })
        );
    }

    sort(key: 'name' | 'releaseDateBook', method: 'asc' | 'desc'): void {
        this.selectKey = key;
        this.selectMethod = method;
        this.all();
    }

    search(inputValue: string): void {
        this.inputValue = inputValue;
        this.all();
    }

    all() {
        this.saveToLocalStorage();

        let allBooks: IBook[] = this.bookLibrary;

        allBooks = allBooks.filter(
            (elem) =>
                elem.amount >= this.modelFilters.filterLeftCarriageAmount &&
                elem.amount <= this.modelFilters.filterRightCarriageAmount
        );
        allBooks = allBooks.filter(
            (elem) =>
                elem.releaseDateBook >= this.modelFilters.filterLeftCarriageAge &&
                elem.releaseDateBook <= this.modelFilters.filterRightCarriageAge
        );
        allBooks = allBooks.filter((elem) => elem.price >= this.modelFilters.filterCurrentPrice);

        allBooks = allBooks.filter((elem) => elem.rating >= this.modelFilters.filterCurrentRating);

        if (this.modelFilters.filterGenreValues.includes(true)) {
            allBooks = filterByActiveGenre(allBooks, this.modelFilters.filterGenreValues);
        }

        if (this.inputValue) {
            allBooks = allBooks.filter((el: IBook): boolean =>
                el.name.toLowerCase().includes(this.inputValue.toLowerCase())
            );
        }

        if (this.selectMethod === 'asc') {
            allBooks.sort((a: IBook, b: IBook): number => {
                if (a[this.selectKey] > b[this.selectKey]) {
                    return 1;
                } else if (a[this.selectKey] === b[this.selectKey]) {
                    return 0;
                } else {
                    return -1;
                }
            });
        } else {
            allBooks.sort((a: IBook, b: IBook): number => {
                if (a[this.selectKey] < b[this.selectKey]) {
                    return 1;
                } else if (a[this.selectKey] === b[this.selectKey]) {
                    return 0;
                } else {
                    return -1;
                }
            });
        }

        this.searchMatch = Boolean(allBooks.length);
        this._books = allBooks;
        document.dispatchEvent(
            new CustomEvent('ModelUpdate', {
                detail: null,
            })
        );
    }

    saveToLocalStorage() {
        localStorage.setItem(
            'userSettings',
            JSON.stringify({
                selectKey: this.selectKey,
                selectMethod: this.selectMethod,
                basketFull: this.basketFull,
                searchMatch: this.searchMatch,
                filterLeftCarriageAmount: this.modelFilters.filterLeftCarriageAmount,
                filterRightCarriageAmount: this.modelFilters.filterRightCarriageAmount,
                filterLeftCarriageAge: this.modelFilters.filterLeftCarriageAge,
                filterRightCarriageAge: this.modelFilters.filterRightCarriageAge,
                filterCurrentPrice: this.modelFilters.filterCurrentPrice,
                filterCurrentRating: this.modelFilters.filterCurrentRating,
                filterGenreValues: this.modelFilters.filterGenreValues,
                basket: this.basket,
            })
        );
    }
}
