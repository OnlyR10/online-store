import { IBook } from './interfaces';
export default class Library {
    private library: IBook[];
    constructor(array: IBook[] = []) {
        this.library = array;
    }

    addBook(book: IBook | IBook[]): void {
        if (Array.isArray(book)) {
            this.library = this.library.concat(book);
        } else {
            this.library.push(book);
        }
    }

    removeBook(bookName: string): void {
        const bookNumber: number = this.library.findIndex((elem: IBook): boolean => elem.name === bookName);
        this.library.splice(bookNumber, 1);
    }

    getLibraryLength(): number {
        return this.library.length;
    }

    getBooks(): IBook[] {
        return this.library;
    }
}
