import BasketView from './basketView';
import { IBook } from './interfaces';
import Model from './model';
import ToolsView from './toolsView';

export default class View {
    toolsView: ToolsView;
    basketView: BasketView;
    constructor(
        public model: Model,
        public body: HTMLBodyElement,
        public basket: HTMLElement,
        public veil: HTMLDivElement,
        public basketFullWarning: HTMLDivElement,
        public toolsContainer: HTMLTableSectionElement
    ) {
        this.toolsView = new ToolsView(this.model, this.toolsContainer);
        this.basketView = new BasketView(this.model, this.basket);
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
                break;
    }
}
