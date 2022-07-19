import BookView from './bookView';
import type { IBook } from '../../../common/interfaces/interfaces';
import type Model from '../../model';

export default class BookLibrary {
    constructor(public model: Model, public booksContainer: HTMLDivElement) {
        this.update();
    }

    addBooksToContainer(books: IBook[]): void {
        for (let i = 0; i < books.length; i = i + 1) {
            const inBasket = this.model.basket.some((elem) => elem.name === books[i].name);
            const book: BookView = new BookView(books[i], this.model, inBasket);

            this.booksContainer.append(book.createBook());
        }
    }

    update() {
        while (this.booksContainer.lastChild) {
            this.booksContainer.lastChild.remove();
        }
        if (this.model.isSearchMatch) {
            this.addBooksToContainer(this.model.books);
        } else {
            const searchWarning = document.createElement('p');
            searchWarning.classList.add('main__warning');
            searchWarning.textContent = 'Извините, совпадений не обнаружено!';
            this.booksContainer.append(searchWarning);
        }
    }
}
