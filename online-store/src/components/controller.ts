import Model from './model';
import View from './views/view';

export default class Controller {
    constructor(
        public model: Model,
        public view: View,
        public body: HTMLBodyElement,
        public veil: HTMLDivElement,
        public warningCross: HTMLButtonElement,
        public basketFullWarning: HTMLDivElement
    ) {
        this.veil.addEventListener('click', (): void => {
            this.body.classList.remove('fix');
            this.veil.classList.remove('veil__darken');
            this.basketFullWarning.classList.add('hidden');
        });

        this.warningCross.addEventListener('click', (): void => {
            this.body.classList.remove('fix');
            this.veil.classList.remove('veil__darken');
            this.basketFullWarning.classList.add('hidden');
        });

        document.addEventListener('ModelUpdate', (event: Event): void => {
            this.view.update((event as CustomEvent<string | null>).detail);
        });
    }
}
