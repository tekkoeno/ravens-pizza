export type Pizza = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    count: number;
    rating: number;
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
export interface PizzaSliceState {
    pizzaItems: Pizza[];
    status: Status;
}
export type SearchPizzaParams = {
    category: string;
    sortBy: string; 
    currentPage: string; 
    order: string; 
    search: string;
}