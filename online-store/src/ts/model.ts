import type { IBook } from './interfaces';
import filterByActiveGenre from './filterByActiveGenre';
import ModelFilters from './modelFilters';

export default class Model {
    public modelFilters: ModelFilters;
    private _books: IBook[];
    private _basket: IBook[];
    public isBasketFull: boolean;
    public isSearchMatch: boolean;
    public selectKey: 'name' | 'releaseDateBook';
    public selectMethod: 'asc' | 'desc';
    private inputValue: string;
    private _MAX_SIZE_OF_BASKET = 20;

    constructor(private bookLibrary: IBook[]) {
        this._books = this.bookLibrary;

        const userSettingsAsString = localStorage.getItem('userSettings');
        if (userSettingsAsString) {
            const storage = JSON.parse(userSettingsAsString);
            this.selectKey = storage.selectKey;
            this.selectMethod = storage.selectMethod;
            this._basket = storage.basket;
            this.isBasketFull = storage.isBasketFull;
            this.isSearchMatch = storage.isSearchMatch;
        } else {
            this.selectKey = 'name';
            this.selectMethod = 'asc';
            this._basket = [];
            this.isBasketFull = false;
            this.isSearchMatch = true;
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
        if (this.basket.length < this._MAX_SIZE_OF_BASKET) {
            this._basket.push(book);
        } else {
            this.isBasketFull = true;
        }
        this.saveToLocalStorage();
        document.dispatchEvent(
            new CustomEvent('ModelUpdate', {
                detail: 'add',
            })
        );
    }

    removeFromBasket(book: IBook) {
        if (this.basket.length === this._MAX_SIZE_OF_BASKET) {
            this.isBasketFull = false;
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

        this.isSearchMatch = Boolean(allBooks.length);
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
                isBasketFull: this.isBasketFull,
                isSearchMatch: this.isSearchMatch,
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
