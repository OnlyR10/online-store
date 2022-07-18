import RangeFiltersView from './rangeFiltersView';
import ValueFiltersView from './valueFiltersView';
import type Model from './model';

export default class FilterView {
    rangeFiltersView: RangeFiltersView;
    valueFiltersView: ValueFiltersView;
    resetLocalStorage: HTMLButtonElement;

    constructor(public model: Model, public filterContainer: HTMLElement) {
        this.filterContainer.innerHTML = /* HTML */ `
            <div class="filter__range"></div>
            <div class="filter__value"></div>
            <button class="btn__reset">Сбросить фильтры</button>
        `;

        const rangeContainer = this.filterContainer.querySelector('.filter__range') as HTMLElement;
        const valueContainer = this.filterContainer.querySelector('.filter__value') as HTMLElement;
        const reset = this.filterContainer.querySelector('.btn__reset') as HTMLButtonElement;

        this.rangeFiltersView = new RangeFiltersView(this.model, rangeContainer);
        this.valueFiltersView = new ValueFiltersView(this.model, valueContainer);

        this.resetLocalStorage = document.createElement('button');
        this.resetLocalStorage.classList.add('btn__reset');
        this.resetLocalStorage.textContent = 'Очистить LocalStorage';

        this.filterContainer.append(this.resetLocalStorage);
        this.resetLocalStorage.addEventListener('click', () => {
            localStorage.removeItem('userSettings');
        });

        reset.addEventListener('click', () => {
            this.model.modelFilters.reset();
            this.rangeFiltersView.sliderRangeAmount.set([
                this.model.modelFilters.filterMinAmount,
                this.model.modelFilters.filterMaxAmount,
            ]);
            this.rangeFiltersView.sliderRangeAge.set([
                this.model.modelFilters.filterMinAge,
                this.model.modelFilters.filterMaxAge,
            ]);
            this.valueFiltersView.sliderPriceRange.set(this.model.modelFilters.filterMinPrice);
            this.valueFiltersView.sliderRatingRange.set(this.model.modelFilters.MIN_BOOKS_RATING);
            this.valueFiltersView.genreContainerInputs.forEach((elem) => {
                const target = elem as HTMLInputElement;
                target.checked = false;
            });
        });
    }
}
