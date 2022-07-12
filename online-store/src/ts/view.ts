import BookView from './bookView';
import { IBook } from './interfaces';
import Model from './model';

export default class View {
    constructor(
        public model: Model,
        public booksContainer: HTMLDivElement,
        public basketContainer: HTMLDivElement,
        public warning: HTMLParagraphElement
    ) {
        this.addBooksToContainer(booksContainer, this.model.books);
        this.addBookToBasket(basketContainer, this.model.basket);
    }

    addBooksToContainer(container: HTMLDivElement, books: IBook[]): void {
        for (let i = 0; i < books.length; i = i + 1) {
            const book: BookView = new BookView(books[i], this.model);
            container.append(book.createBook());
        }
    }

    addBookToBasket(basket: HTMLDivElement, books: IBook[]) {
        this.warning.classList.toggle('hidden', Boolean(books.length));
        for (let i = 0; i < books.length; i = i + 1) {
            const container: HTMLDivElement = document.createElement('div');
            container.classList.add('basket__book-container');
            container.innerHTML = /* html */ `
                <div class="basket__remove-book"></div>
                <div class="basket__book-name">${books[i].name}</div>
            `;
            basket.append(container);
            // const book: BookView = new BookView(books[i], this.model);
            // container.append(book.createBookInBasket());
        }
    }

    update() {
        while (this.booksContainer.lastChild) {
            this.booksContainer.lastChild.remove();
        }
        while (this.basketContainer.lastChild) {
            this.basketContainer.lastChild.remove();
        }

        this.addBooksToContainer(this.booksContainer, this.model.books);
        this.addBookToBasket(this.basketContainer, this.model.basket);
    }
}
