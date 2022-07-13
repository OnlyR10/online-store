import BookView from './bookView';
import { IBook } from './interfaces';
import Model from './model';
import ToolsView from './toolsView';

export default class View {
    toolsView: ToolsView;
    constructor(
        public model: Model,
        public body: HTMLBodyElement,
        public booksContainer: HTMLDivElement,
        public basketContainer: HTMLDivElement,
        public basketEmptyWarning: HTMLParagraphElement,
        public veil: HTMLDivElement,
        public toolsContainer: HTMLTableSectionElement
    ) {
        this.toolsView = new ToolsView(this.model, this.toolsContainer);
    }

    addBooksToContainer(container: HTMLDivElement, books: IBook[]): void {
        for (let i = 0; i < books.length; i = i + 1) {
            const book: BookView = new BookView(books[i], this.model);
            container.append(book.createBook());
        }
    }

    addBookToBasket(basket: HTMLDivElement, books: IBook[]) {
        this.basketEmptyWarning.classList.toggle('hidden', Boolean(books.length));
        for (let i = 0; i < books.length; i = i + 1) {
            const container: HTMLDivElement = document.createElement('div');
            container.classList.add('basket__container-book');

            const bookRemove: HTMLButtonElement = document.createElement('button');
            bookRemove.classList.add('basket__container-book_remove');

            const bookName: HTMLDivElement = document.createElement('div');
            bookName.classList.add('basket__container-book_name');
            bookName.textContent = `${books[i].name}`;

            container.append(bookRemove);
            container.append(bookName);
            basket.append(container);

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
        if (this.model.basketFull) {
            this.body.classList.add('fix');
            this.veil.classList.add('veil__darken');
            this.basketFullWarning.classList.remove('hidden');
        }
        this.addBooksToContainer(this.booksContainer, this.model.books);
        this.addBookToBasket(this.basketContainer, this.model.basket);
    }
}
