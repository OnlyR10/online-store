import type { IBook } from './interfaces';
import type Model from './model';

const pathToBookImg = './books/';

export default class BookView {
    constructor(private book: IBook, private model: Model) {}

    createBook(): HTMLDivElement {
        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('main__book-container');
        container.innerHTML = /* html */ `
          <div class="main__img-container">
              <img src="${pathToBookImg}${this.book.image}" alt="${this.book.name}" width="200" height="305" class="main__img">
              <div class="main__veil hidden"></div> 
              <div class="main__cart hidden"></div> 
          </div>
          <div class="main__info-container">
              <h3 class="list__item">${this.book.name}</h3>
              <p class="list__item">Год издания: ${this.book.releaseDateBook}</p>
              <p class="list__item">Автор: ${this.book.author}</p>
              <p class="list__item">Количество книг на складе: ${this.book.amount}</p>
          </div>
      `;

        container.addEventListener('click', () => {
            if (this.model.basket.includes(this.book)) {
                this.model.removeFromBasket(this.book);
            } else {
                this.model.addToBasket(this.book);
            }
        });

        return container;
    }
}
