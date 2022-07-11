import Model from './model';
import View from './view';

export default class Controller {
    constructor(
        public model: Model,
        public view: View,
        public input: HTMLInputElement,
        public select: HTMLSelectElement
    ) {
        this.select.addEventListener('change', () => {
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

        document.addEventListener('booksSorted', () => {
            this.view.update();
        });
    }
}
