import type Model from './model';
import SearchView from './searchView';
import SortView from './sortView';

export default class ToolsView {
    searchView: SearchView;
    sortView: SortView;
    resetLocalStorage: HTMLButtonElement;

    constructor(public model: Model, public toolsContainer: HTMLElement) {
        this.searchView = new SearchView(this.model);
        this.sortView = new SortView(this.model);

        this.resetLocalStorage = document.createElement('button');
        this.resetLocalStorage.classList.add('tools__reset-storage');
        this.resetLocalStorage.textContent = 'Очистить LocalStorage';

        this.toolsContainer.append(this.resetLocalStorage);
        this.toolsContainer.append(this.searchView.container);
        this.toolsContainer.append(this.sortView.container);

        this.resetLocalStorage.addEventListener('click', () => {
            localStorage.removeItem('userSettings');
        });
    }
}
