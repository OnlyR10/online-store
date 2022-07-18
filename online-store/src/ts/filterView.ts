import RangeFiltersView from './rangeFiltersView';
import ValueFiltersView from './valueFiltersView';
import type Model from './model';

export default class FilterView {
    rangeFiltersView: RangeFiltersView;
    valueFiltersView: ValueFiltersView;

    constructor(public model: Model, public filterContainer: HTMLElement) {
        this.filterContainer.innerHTML = /* HTML */ `
            <div class="filter__range"></div>
            <div class="filter__value"></div>
            <input type="reset" class="filter__reset" />
        `;

        const rangeContainer = this.filterContainer.querySelector('.filter__range') as HTMLElement;
        const valueContainer = this.filterContainer.querySelector('.filter__value') as HTMLElement;
        const reset = this.filterContainer.querySelector('.filter__reset') as HTMLButtonElement;

        this.rangeFiltersView = new RangeFiltersView(this.model, rangeContainer);
        this.valueFiltersView = new ValueFiltersView(this.model, valueContainer);

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
