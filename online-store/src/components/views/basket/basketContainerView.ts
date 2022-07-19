import type { IBook } from '../../../common/interfaces/interfaces';
import type Model from '../../model';

export default class BasketContainerView {
    constructor(public model: Model, public basketContainer: HTMLElement) {}

    addBookToBasket(books: IBook[]): void {
        books.forEach((elem: IBook) => {
            const container: HTMLDivElement = document.createElement('div');
            container.classList.add('basket__container-book');

            const bookRemove: HTMLButtonElement = document.createElement('button');
            bookRemove.classList.add('basket__container-book_remove');

            const bookName: HTMLDivElement = document.createElement('div');
            bookName.classList.add('basket__container-book_name');
            bookName.textContent = `${elem.name}`;

            container.append(bookRemove);
            container.append(bookName);
            this.basketContainer.append(container);

            bookRemove.addEventListener('click', () => {
                container.remove();
                this.model.removeFromBasket(elem);
            });
        });
    }

    update() {
        this.addBookToBasket(this.model.basket);
    }
}
