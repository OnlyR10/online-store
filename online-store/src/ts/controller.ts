import Model from './model';
import View from './view';

export default class Controller {
    constructor(
        public model: Model,
        public view: View,
        public main: HTMLDivElement,
        public select: HTMLSelectElement,
        public input: HTMLInputElement
    ) {
        this.select.addEventListener('change', (): void => {
            switch (this.select.value) {
                case 'nameAsc':
                    this.model.sort('name', 'asc');
                    break;

                case 'nameDesc':
                    this.model.sort('name', 'desc');
                    break;

                case 'ageAsc':
                    this.model.sort('releaseDateBook', 'asc');
                    break;

                case 'ageDesc':
                    this.model.sort('releaseDateBook', 'desc');
                    break;
            }
        });

        this.input.addEventListener('input', (): void => {
            this.model.search(this.input.value);
        });

        document.addEventListener('ModelUpdate', (): void => {
            this.view.update();
        });
    }
}
