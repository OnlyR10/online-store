import type Model from './model';
import noUiSlider from 'nouislider';
import searchStep from './searchStep';

export default class RangeFiltersView {
    sliderRangeAmount;
    sliderRangeAge;

    constructor(public model: Model, public filterContainer: HTMLElement) {
        this.filterContainer.innerHTML = /* HTML */ `
            <div class="filter__range-container">
                <p class="range-info">По количеству книг</p>
                <div class="filter__range-amount"></div>
            </div>
            <div class="filter__range-container">
                <p class="range-info">По году выпуска книги</p>
                <div class="filter__range-age"></div>
            </div>
        `;

        const rangeAmount = this.filterContainer.querySelector('.filter__range-amount') as HTMLElement;

        const stepRangeAmount = searchStep(
            this.model.modelFilters.filterMinAmount,
            this.model.modelFilters.filterMaxAmount,
            this.model.modelFilters.numberEachBookInLibrary
        );

        this.sliderRangeAmount = noUiSlider.create(rangeAmount, {
            start: [
                this.model.modelFilters.filterLeftCarriageAmount,
                this.model.modelFilters.filterRightCarriageAmount,
            ],
            tooltips: true,
            connect: true,
            step: stepRangeAmount,
            range: {
                min: this.model.modelFilters.filterMinAmount,
                max: this.model.modelFilters.filterMaxAmount,
            },
        });

        this.sliderRangeAmount.on('change', (values) => {
            const updateValues = values.map((elem) => Number(elem));
            this.model.modelFilters.filterByQuantity(updateValues);
        });

        const rangeAge = this.filterContainer.querySelector('.filter__range-age') as HTMLElement;

        const stepRangeAge = searchStep(
            this.model.modelFilters.filterMinAge,
            this.model.modelFilters.filterMaxAge,
            this.model.modelFilters.yearPublicationEachBook
        );

        this.sliderRangeAge = noUiSlider.create(rangeAge, {
            start: [this.model.modelFilters.filterLeftCarriageAge, this.model.modelFilters.filterRightCarriageAge],
            tooltips: true,
            connect: true,
            step: stepRangeAge,
            range: {
                min: this.model.modelFilters.filterMinAge,
                max: this.model.modelFilters.filterMaxAge,
            },
        });

        this.sliderRangeAge.on('change', (values) => {
            const updateValues = values.map((elem) => Number(elem));
            this.model.modelFilters.filterByYear(updateValues);
        });
    }
}
