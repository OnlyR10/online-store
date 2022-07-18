import BasketView from './basketView';
import BookLibrary from './bookLibrary';
import Model from './model';
import ToolsView from './toolsView';
import FilterView from './filterView';

export default class View {
    toolsView: ToolsView;
    filterView: FilterView;
    basketView: BasketView;
    bookLibrary: BookLibrary;

    constructor(
        public model: Model,
        public body: HTMLBodyElement,
        public main: HTMLDivElement,
        public basket: HTMLElement,
        public veil: HTMLDivElement,
        public basketFullWarning: HTMLDivElement,
        public tools: HTMLTableSectionElement,
        public filter: HTMLTableSectionElement
    ) {
        this.toolsView = new ToolsView(this.model, this.tools);
        this.filterView = new FilterView(this.model, this.filter);
        this.basketView = new BasketView(this.model, this.basket);
        this.bookLibrary = new BookLibrary(this.model, this.main);
    }

    update(eventName: string): void {
        switch (eventName) {
            case 'add':
            case 'remove':
                if (this.model.basketFull) {
                    this.body.classList.add('fix');
                    this.veil.classList.add('veil__darken');
                    this.basketFullWarning.classList.remove('hidden');
                }
                this.basketView.update();
                this.bookLibrary.update();
                break;
            default:
                this.bookLibrary.update();
                break;
        }
    }
}
