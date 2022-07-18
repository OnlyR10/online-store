import BookView from './bookView';
import type { IBook } from './interfaces';
import type Model from './model';

export default class BookLibrary {
    constructor(public model: Model, public booksContainer: HTMLDivElement) {
        this.update();
    }

    addBooksToContainer(books: IBook[]): void {
        for (let i = 0; i < books.length; i = i + 1) {
            let book: BookView;
            if (this.model.basket.some((elem) => elem.name === books[i].name)) {
                book = new BookView(books[i], this.model, true);
            } else {
                book = new BookView(books[i], this.model, false);
            }

            this.booksContainer.append(book.createBook());
        }
    }

    update() {
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
