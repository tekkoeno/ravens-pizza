import { RootState } from "../../store";

export const filterSort = (state: RootState) => state.filter.sort;
export const filterSortProperty = (state: RootState) => state.filter.sort.sortProperty;
export const filterState = (state: RootState) => state.filter;