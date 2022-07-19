import type { IBook } from '../interfaces/interfaces';

export default function filterByActiveGenre(books: IBook[], isConditions: boolean[]): IBook[] {
    const novel: 'роман' | undefined = isConditions[0] ? 'роман' : undefined;
    const drama: 'драма' | undefined = isConditions[1] ? 'драма' : undefined;
    const fantasy: 'фэнтези' | undefined = isConditions[2] ? 'фэнтези' : undefined;
    books = books.filter((elem: IBook) => elem.genre === novel || elem.genre === drama || elem.genre === fantasy);
    return books;
}
