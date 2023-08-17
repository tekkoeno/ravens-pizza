import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortEnum } from './type';

const initialState: FilterSliceState = {
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: SortEnum.RATING,
  },
  categoryId: 0,
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategory (state, action: PayloadAction<number>){
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>){
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if ( Object.keys(action.payload).length ) {
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.currentPage = 1;
      }
      
    },
  },
});

export const { setSort, setCategory, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
