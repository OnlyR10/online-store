import Model from './model';

export default class SearchView {
    container: HTMLElement;

    constructor(public model: Model) {
        this.container = document.createElement('div');
        this.container.classList.add('tools__search-container');
        this.container.innerHTML = /* HTML */ `
            <label class="tools__search-info" for="search"> Поиск </label>
            <div class="tools__icon-container">
                <div class="tools__search-icon"></div>
            </div>
            <div class="tools__input-search">
                <input
                    id="search"
                    type="text"
                    class="tools__search"
                    placeholder="Искать..."
                    autofocus
                    autocomplete="off"
                />
                <button class="tools__cross-button"></button>
            </div>
        `;

        const input = this.container.querySelector('.tools__search') as HTMLInputElement;
        const cross = this.container.querySelector('.tools__cross-button') as HTMLButtonElement;

        input.addEventListener('input', (): void => {
            this.model.search(input.value);
        });

        cross.addEventListener('click', (): void => {
            this.model.search((input.value = ''));
            input.focus();
        });
    }
}
