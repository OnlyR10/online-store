export interface IBook {
    name: string;
    releaseDateBook: number;
    image: string;
    author: string;
    amount: number;
}

export interface IEvents {
    [event: string]: Event;
}
