import './style.scss';
import Controller from './components/controller';
import Model from './components/model';
import View from './components/views/view';
import books from './common/constants/books.json';

const body = document.querySelector('.body') as HTMLBodyElement;
// const header = document.querySelector('.header') as HTMLHeadElement;
const tools = document.querySelector('.tools') as HTMLTableSectionElement;
const filter = document.querySelector('.filter') as HTMLTableSectionElement;
const main = document.querySelector('.main') as HTMLDivElement;
const basket = document.querySelector('.basket') as HTMLDivElement;

const veil = document.querySelector('.veil') as HTMLDivElement;
const warning = document.querySelector('.warning') as HTMLDivElement;
const warningCross = document.querySelector('.warning__cross') as HTMLButtonElement;

const model = new Model(books);
const view = new View(model, body, main, basket, veil, warning, tools, filter);
const controller = new Controller(model, view, body, veil, warningCross, warning);
