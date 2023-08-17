export const enum SortEnum {
  RATING = "rating",
  RATING_DOWN = "-rating",
  PRICE = "price",
  PRICE_DOWN = "-price",
  ALPHABET = "alphabet",
  ALPHABET_DOWN = "-alphabet",
}
export type Sort = {
  name: string,
  sortProperty: string,
} 
export interface FilterSliceState {
  sort: {
    name: string,
    sortProperty: string,
  },
  categoryId: number;
  searchValue: string;
  currentPage: number;
}