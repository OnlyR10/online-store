import type Model from './model';
import { IUserSettings } from '../common/interfaces/interfaces';

export default class ModelFilters {
    public numberEachBookInLibrary: number[];
    public filterMinAmount: number;
    public filterMaxAmount: number;
    public filterLeftCarriageAmount: number;
    public filterRightCarriageAmount: number;
    public yearPublicationEachBook: number[];
    public filterMinAge: number;
    public filterMaxAge: number;
    public filterLeftCarriageAge: number;
    public filterRightCarriageAge: number;
    public priceEachBook: number[];
    public filterMinPrice: number;
    public filterMaxPrice: number;
    public filterCurrentPrice: number;
    public MIN_BOOKS_RATING = 3;
    public MAX_BOOKS_RATING = 5;
    public STEP_RATING = 0.1;
    public filterCurrentRating: number;
    public filterGenreValues: boolean[];

    constructor(public model: Model) {
        this.numberEachBookInLibrary = this.model.books.map((el) => el.amount);
        this.filterMinAmount = Math.min(...this.numberEachBookInLibrary);
        this.filterMaxAmount = Math.max(...this.numberEachBookInLibrary);
        this.yearPublicationEachBook = this.model.books.map((el) => el.releaseDateBook);
        this.filterMinAge = Math.min(...this.yearPublicationEachBook);
        this.filterMaxAge = Math.max(...this.yearPublicationEachBook);
        this.priceEachBook = this.model.books.map((el) => el.price);
        this.filterMinPrice = Math.min(...this.priceEachBook);
        this.filterMaxPrice = Math.max(...this.priceEachBook);

        const userSettingsAsString: string | null = localStorage.getItem('userSettings');
        if (userSettingsAsString) {
            const storage: IUserSettings = JSON.parse(userSettingsAsString);
            this.filterLeftCarriageAmount = storage.filterLeftCarriageAmount;
            this.filterRightCarriageAmount = storage.filterRightCarriageAmount;
            this.filterLeftCarriageAge = storage.filterLeftCarriageAge;
            this.filterRightCarriageAge = storage.filterRightCarriageAge;
            this.filterCurrentPrice = storage.filterCurrentPrice;
            this.filterCurrentRating = storage.filterCurrentRating;
            this.filterGenreValues = storage.filterGenreValues;
        } else {
            this.filterLeftCarriageAmount = this.filterMinAmount;
            this.filterRightCarriageAmount = this.filterMaxAmount;
            this.filterLeftCarriageAge = this.filterMinAge;
            this.filterRightCarriageAge = this.filterMaxAge;
            this.filterCurrentRating = this.MIN_BOOKS_RATING;
            this.filterGenreValues = [false, false, false];
            this.filterCurrentPrice = this.filterMinPrice;
        }
    }

    filterByQuantity(values: number[]): void {
        [this.filterLeftCarriageAmount, this.filterRightCarriageAmount] = [...values];
        this.model.all();
    }

    filterByYear(values: number[]): void {
        [this.filterLeftCarriageAge, this.filterRightCarriageAge] = [...values];
        this.model.all();
    }

    filterByRating(value: number): void {
        this.filterCurrentRating = value;
        this.model.all();
    }

    filterByGenre(name: 'novel' | 'drama' | 'fantasy', isCondition: boolean): void {
        if (name === 'novel') {
            this.filterGenreValues[0] = isCondition;
        } else if (name === 'drama') {
            this.filterGenreValues[1] = isCondition;
        } else if (name === 'fantasy') {
            this.filterGenreValues[2] = isCondition;
        }
        this.model.all();
    }

    filterByPrice(value: number): void {
        this.filterCurrentPrice = value;
        this.model.all();
    }

    reset(): void {
        this.filterLeftCarriageAmount = this.filterMinAmount;
        this.filterRightCarriageAmount = this.filterMaxAmount;
        this.filterLeftCarriageAge = this.filterMinAge;
        this.filterRightCarriageAge = this.filterMaxAge;
        this.filterCurrentPrice = this.filterMinPrice;
        this.filterCurrentRating = this.MIN_BOOKS_RATING;
        this.filterGenreValues = [false, false, false];
        this.model.all();
    }
}
