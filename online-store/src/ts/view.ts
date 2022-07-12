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
            container.classList.add('basket__container-book');
            // container.innerHTML = /* html */ `
            //     <div class="basket__container-book_remove"></div>
            //     <div class="basket__container-book_name">${books[i].name}</div>
            // `;

            const bookRemove: HTMLDivElement = document.createElement('div');
            bookRemove.classList.add('basket__container-book_remove');

            const bookName: HTMLDivElement = document.createElement('div');
            bookName.classList.add('basket__container-book_name');
            bookName.textContent = `${books[i].name}`;

            container.append(bookRemove);
            container.append(bookName);
            basket.append(container);
            // const book: BookView = new BookView(books[i], this.model);
            // container.append(book.createBookInBasket());

            bookRemove.addEventListener('click', () => {
                container.remove();
                this.model.removeFromBasket(books[i]);
            });
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
