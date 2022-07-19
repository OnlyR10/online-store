import type Model from './model';
import noUiSlider from 'nouislider';
import searchStep from './searchStep';

export default class ValueFiltersView {
    sliderPriceRange;
    sliderRatingRange;
    ratingRange;
    priceRange;
    genreContainer;
    genreContainerInputs;

    constructor(public model: Model, public filterContainer: HTMLElement) {
        this.filterContainer.innerHTML = /* HTML */ `
            <div class="filter__rating-container">
                <p class="rating-info">По рейтингу</p>
                <div class="rating-range"></div>
            </div>

            <div class="filter__price-container">
                <p class="price-info">По стоимости, BYN.</p>
                <div class="price-range"></div>
            </div>

            <div class="filter__genre-container">
                <p class="genre-container__info">По жанру</p>
                <div class="genre-container">
                    <p class="genre-info">роман</p>
                    <input type="checkbox" name="novel" class="genre-checkbox" />
                </div>
                <div class="genre-container">
                    <p class="genre-info">драма</p>
                    <input type="checkbox" name="drama" class="genre-checkbox" />
                </div>
                <div class="genre-container">
                    <p class="genre-info">фэнтези</p>
                    <input type="checkbox" name="fantasy" class="genre-checkbox" />
                </div>
            </div>
        `;

        this.ratingRange = this.filterContainer.querySelector('.rating-range') as HTMLElement;

        this.sliderRatingRange = noUiSlider.create(this.ratingRange, {
            start: this.model.modelFilters.filterCurrentRating,
            tooltips: true,
            connect: 'lower',
            step: this.model.modelFilters.STEP_RATING,
            range: {
                min: this.model.modelFilters.MIN_BOOKS_RATING,
                max: this.model.modelFilters.MAX_BOOKS_RATING,
            },
        });

        this.sliderRatingRange.on('change', (value) => {
            this.model.modelFilters.filterByRating(Number(value));
        });

        this.priceRange = this.filterContainer.querySelector('.price-range') as HTMLElement;

        const stepPriceRange = searchStep(
            this.model.modelFilters.filterMinPrice,
            this.model.modelFilters.filterMaxPrice,
            this.model.modelFilters.priceEachBook
        );

        this.sliderPriceRange = noUiSlider.create(this.priceRange, {
            start: this.model.modelFilters.filterCurrentPrice,
            tooltips: true,
            connect: 'lower',
            step: stepPriceRange,
            range: {
                min: this.model.modelFilters.filterMinPrice,
                max: this.model.modelFilters.filterMaxPrice,
            },
        });

        this.sliderPriceRange.on('change', (value) => {
            this.model.modelFilters.filterByPrice(Number(value));
        });

        this.genreContainer = this.filterContainer.querySelector('.filter__genre-container') as HTMLElement;

        this.genreContainerInputs = this.genreContainer.querySelectorAll('input[type=checkbox]');

        this.genreContainerInputs.forEach((elem, index) => {
            const target = elem as HTMLInputElement;
            target.checked = this.model.modelFilters.filterGenreValues[index];
        });

        this.genreContainer.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const name = target.getAttribute('name');
            const isCondition = target.checked;
            if (name === 'novel' || name === 'drama' || name === 'fantasy') {
                this.model.modelFilters.filterByGenre(name, isCondition);
            }
        });
    }
}
