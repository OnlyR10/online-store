import type { IBook } from './interfaces';

export default function filterByActiveGenre(books: IBook[], conditions: boolean[]): IBook[] {
    const novel = conditions[0] ? 'роман' : undefined;
    const drama = conditions[1] ? 'драма' : undefined;
    const fantasy = conditions[2] ? 'фэнтези' : undefined;
    books = books.filter((elem) => elem.genre === novel || elem.genre === drama || elem.genre === fantasy);
    return books;
}
