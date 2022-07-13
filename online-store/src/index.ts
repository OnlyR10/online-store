import './style.scss';
import Controller from './ts/controller';
import Model from './ts/model';
import View from './ts/view';
import Library from './ts/library';
import books from './books.json';

const body = document.querySelector('.body') as HTMLBodyElement;
const main = document.querySelector('.main') as HTMLDivElement;

const basket = document.querySelector('.basket__container') as HTMLDivElement;
const warningMessage = document.querySelector('.basket-warning') as HTMLDivElement;

const select = document.querySelector('.tools__sort') as HTMLSelectElement;
const input = document.querySelector('#search') as HTMLInputElement;

const veil = document.querySelector('.veil') as HTMLDivElement;
const warning = document.querySelector('.warning') as HTMLDivElement;
const warningCross = document.querySelector('.warning__cross') as HTMLButtonElement;

const model = new Model(new Library(books));
const view = new View(model, body, main, basket, warningMessage, veil, warning);
const controller = new Controller(model, view, body, main, select, input, veil, warningCross, warning);
