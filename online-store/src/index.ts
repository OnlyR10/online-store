import './style.scss';
import Controller from './ts/controller';
import Model from './ts/model';
import View from './ts/view';
import Library from './ts/library';
import books from './books.json';

const main = document.querySelector('#main') as HTMLDivElement;
const input = document.querySelector('#search') as HTMLInputElement;
const select = document.querySelector('.tools__sort') as HTMLSelectElement;

const model = new Model(new Library(books));
const view = new View(model, main);
const controller = new Controller(model, view, input, select);
