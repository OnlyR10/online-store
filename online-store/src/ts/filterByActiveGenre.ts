import type { IBook } from './interfaces';

export default function filterByActiveGenre(books: IBook[], isConditions: boolean[]): IBook[] {
    const novel = isConditions[0] ? 'роман' : undefined;
    const drama = isConditions[1] ? 'драма' : undefined;
    const fantasy = isConditions[2] ? 'фэнтези' : undefined;
    books = books.filter((elem) => elem.genre === novel || elem.genre === drama || elem.genre === fantasy);
    return books;
}
