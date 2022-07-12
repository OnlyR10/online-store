import './style.scss';
import Controller from './ts/controller';
import Model from './ts/model';
import View from './ts/view';
import Library from './ts/library';
import books from './books.json';

const main = document.querySelector('.main') as HTMLDivElement;
const warningMessage = document.querySelector('.basket-warning') as HTMLDivElement;
const basket = document.querySelector('.basket__container') as HTMLDivElement;
const select = document.querySelector('.tools__sort') as HTMLSelectElement;
const input = document.querySelector('#search') as HTMLInputElement;

const model = new Model(new Library(books));
const view = new View(model, main, basket, warningMessage);
const controller = new Controller(model, view, main, select, input);
