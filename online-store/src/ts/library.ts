import Book from './book';
import books from '../books.json';

class Library {
    private library: Book[];
    constructor(array: Book[] = []) {
        this.library = array;
    }

    addBook(book: Book | Book[]): void {
        if (Array.isArray(book)) {
            this.library = this.library.concat(book);
        } else {
            this.library.push(book);
        }
    }

    removeBook(bookName: string): void {
        const bookNumber: number = this.library.findIndex((elem: Book): boolean => elem.name === bookName);
        this.library.splice(bookNumber, 1);
    }

    getLibraryLength(): number {
        return this.library.length;
    }

    getBooks(): Book[] {
        return this.library;
    }
}

const library = new Library(books);

export default library;
