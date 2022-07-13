import BookView from './bookView';
import type { IBook } from './interfaces';
import type Model from './model';

export default class BookLibrary {
    constructor(public model: Model, public booksContainer: HTMLDivElement) {
        this.update();
    }

    addBooksToContainer(books: IBook[]): void {
        for (let i = 0; i < books.length; i = i + 1) {
            const book: BookView = new BookView(books[i], this.model);
            this.booksContainer.append(book.createBook());
        }
    }

    update() {
        console.log(this.model.searchMatch);
        while (this.booksContainer.lastChild) {
            this.booksContainer.lastChild.remove();
        }
        if (this.model.searchMatch) {
            this.addBooksToContainer(this.model.books);
        } else {
            const searchWarning = document.createElement('p');
            searchWarning.classList.add('main__warning');
            searchWarning.textContent = 'Извините, совпадений не обнаружено!';
            this.booksContainer.append(searchWarning);
        }
    }
}
