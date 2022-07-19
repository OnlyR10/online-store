import BookView from './bookView';
import type { IBook } from '../../../common/interfaces/interfaces';
import type Model from '../../model';

export default class BookLibrary {
    constructor(public model: Model, public booksContainer: HTMLDivElement) {
        this.update();
    }

    addBooksToContainer(books: IBook[]): void {
        books.forEach((elem) => {
            const inBasket = this.model.basket.some((item) => item.name === elem.name);
            const book: BookView = new BookView(elem, this.model, inBasket);

            this.booksContainer.append(book.createBook());
        });
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
