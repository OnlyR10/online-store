import { IBook } from './interfaces';
import Model from './model';

const pathToBookImg = './books/';

export default class View {
    constructor(public model: Model, public container: HTMLDivElement) {
        this.addBooksInContainer(container, this.model.books);
    }

    createBook(book: IBook): HTMLDivElement {
        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('main__container');
        container.innerHTML = /* html */ `
            <div class="main__img-container">
                <img src="${pathToBookImg}${book.image}" alt="${book.name}" width="200" height="305" class="main__img">
                <div class="main-veil hidden"></div> 
                <div class="main__cart hidden"></div> 
            </div>
            <div class="main__info-container">
                <h3 class="list__item">${book.name}</h3>
                <p class="list__item">Год издания: ${book.releaseDateBook}</p>
                <p class="list__item">Автор: ${book.author}</p>
                <p class="list__item">Количество книг на складе: ${book.amount}</p>
            </div>
        `;

        return container;
    }

    addBooksInContainer(container: HTMLDivElement, books: IBook[]): void {
        for (let i = 0; i < books.length; i = i + 1) {
            container.append(this.createBook(books[i]));
        }
    }

    update() {
        while (this.container.lastChild) {
            this.container.lastChild.remove();
        }

        this.addBooksInContainer(this.container, this.model.books);
    }
}
