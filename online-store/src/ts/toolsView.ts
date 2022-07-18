import type Model from './model';
import SearchView from './searchView';
import SortView from './sortView';

export default class ToolsView {
    searchView: SearchView;
    sortView: SortView;

    constructor(public model: Model, public toolsContainer: HTMLElement) {
        this.searchView = new SearchView(this.model);
        this.sortView = new SortView(this.model);

        this.toolsContainer.append(this.searchView.container);
        this.toolsContainer.append(this.sortView.container);
    }
}
