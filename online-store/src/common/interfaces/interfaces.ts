export interface IBook {
    name: string;
    releaseDateBook: number;
    image: string;
    author: string;
    amount: number;
    genre: string;
    price: number;
    rating: number;
}

export interface IUserSettings {
    selectKey: 'name' | 'releaseDateBook';
    selectMethod: 'asc' | 'desc';
    isBasketFull: boolean;
    isSearchMatch: boolean;
    filterLeftCarriageAmount: number;
    filterRightCarriageAmount: number;
    filterLeftCarriageAge: number;
    filterRightCarriageAge: number;
    filterCurrentPrice: number;
    filterCurrentRating: number;
    filterGenreValues: boolean[];
    basket: IBook[];
}
