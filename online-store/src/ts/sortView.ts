import type Model from './model';

export default class SortView {
    container: HTMLElement;

    constructor(public model: Model) {
        this.container = document.createElement('div');
        this.container.classList.add('tools__sort-container');
        this.container.innerHTML = /* HTML */ `
            <select name="sort" class="tools__sort">
                <option value="nameAsc" class="tools__sort-item">По имени ↑</option>
                <option value="nameDesc" class="tools__sort-item">По имени ↓</option>
                <option value="ageAsc" class="tools__sort-item">По году издания ↑</option>
                <option value="ageDesc" class="tools__sort-item">По году издания ↓</option>
            </select>
        `;

        const select = this.container.querySelector('.tools__sort') as HTMLInputElement;

        select.addEventListener('change', (): void => {
            switch (select.value) {
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
    }
}
