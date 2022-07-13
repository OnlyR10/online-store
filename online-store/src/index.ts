import './style.scss';
import Controller from './ts/controller';
import Model from './ts/model';
import View from './ts/view';
import Library from './ts/library';
import books from './books.json';

const body = document.querySelector('.body') as HTMLBodyElement;
const tools = document.querySelector('.tools') as HTMLTableSectionElement;
const main = document.querySelector('.main') as HTMLDivElement;
const basket = document.querySelector('.basket') as HTMLDivElement;

const veil = document.querySelector('.veil') as HTMLDivElement;
const warning = document.querySelector('.warning') as HTMLDivElement;
const warningCross = document.querySelector('.warning__cross') as HTMLButtonElement;

const model = new Model(new Library(books));
const view = new View(model, body, main, basket, warningMessage, veil, warning);
const controller = new Controller(model, view, body, main, select, input, veil, warningCross, warning);
