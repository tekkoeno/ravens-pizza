import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './type';
export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizza', async (params) => {
  const {category, sortBy, currentPage, order, search} = params;
  const {data} = await axios.get(`https://647ea71bc246f166da8f3c72.mockapi.io/items?${category}&sortBy=${sortBy}&page=${currentPage}&search=${search}&limit=4&order=${order}`)
  return data;
})
const initialState: PizzaSliceState = {
  pizzaItems: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Pizza[]>){
      state.pizzaItems = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzaItems = [];
    })
    builder.addCase(fetchPizza.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
      state.status = Status.SUCCESS;
      state.pizzaItems = action.payload;
    })
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzaItems = [];
    })
  }
  
});

export default pizzaSlice.reducer;
