import type { IBook } from './interfaces';
import type Model from './model';

const PATH_TO_BOOK_IMG = './books/';

export default class BookView {
    constructor(private book: IBook, private model: Model, public inBasket: boolean) {}

    createBook(): HTMLDivElement {
        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('main__book-container');
        container.innerHTML = /* html */ `
          <div class="main__img-container">
              <img src="${PATH_TO_BOOK_IMG}${this.book.image}" alt="${this.book.name}" width="200" height="305" class="main__img">
          </div>
          <div class="main__info-container">
              <h3 class="list__item main__info-header">${this.book.name}</h3>
              <p class="list__item main__info-item">Рейтинг: ${this.book.rating}</p>
              <p class="list__item main__info-item">Год издания: ${this.book.releaseDateBook}</p>
              <p class="list__item main__info-item">Автор: ${this.book.author}</p>
              <p class="list__item main__info-item">Жанр: ${this.book.genre}</p>
              <p class="list__item main__info-item">Стоимость в BYN: ${this.book.price}</p>
              <p class="list__item main__info-item">Количество книг на складе: ${this.book.amount}</p>
          </div>
      `;

        const mainImgContainer = container.querySelector('.main__img-container') as HTMLElement;

        if (this.inBasket) {
            const veil = document.createElement('div');
            veil.classList.add('main__veil');
            const cart = document.createElement('div');
            cart.classList.add('main__cart');
            mainImgContainer.append(veil, cart);
        } else {
            const veil = document.createElement('div');
            veil.classList.add('main__veil', 'hidden');
            const cart = document.createElement('div');
            cart.classList.add('main__cart', 'hidden');
            mainImgContainer.append(veil, cart);
        }

        container.addEventListener('click', (e) => {
            // debugger;
            if (this.model.basket.some((elem) => elem.name === this.book.name)) {
                this.model.removeFromBasket(this.book);
            } else {
                this.model.addToBasket(this.book);
            }
        });

        return container;
    }
}
