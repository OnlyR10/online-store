import BasketContainerView from './basketContainerView';
import type Model from './model';

export default class BasketView {
    basketContainerView: BasketContainerView;
    basketContainer: HTMLElement;
    basketWarning: HTMLParagraphElement;
    basketCounter: HTMLParagraphElement;

    constructor(public model: Model, public basket: HTMLElement) {
        this.basket.innerHTML = /* HTML */ `
            <h2 class="basket-header">Корзина</h2>
            <p class="basket-counter">0</p>
            <p class="basket-warning">Ваша корзина пуста!</p>
            <div class="basket__container"></div>
        `;

        this.basketCounter = this.basket.querySelector('.basket-counter') as HTMLParagraphElement;
        this.basketWarning = this.basket.querySelector('.basket-warning') as HTMLParagraphElement;
        this.basketContainer = this.basket.querySelector('.basket__container') as HTMLElement;

        this.basketContainerView = new BasketContainerView(this.model, this.basketContainer);

        this.update();
    }

    update() {
        while (this.basketContainer.lastChild) {
            this.basketContainer.lastChild.remove();
        }
        this.basketCounter.textContent = `${this.model.basket.length}`;
        this.basketWarning.classList.toggle('hidden', Boolean(this.model.basket.length));
        this.basketContainerView.update();
    }
}
