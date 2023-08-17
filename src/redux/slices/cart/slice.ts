import { calculateTotalPrice } from './../../../utils/calculateTotalPrice';
import { CartSliceItem } from './types';
import { getCartFromLS } from './../../../utils/getCartFromLS';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartSliceItem = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem (state, action) {
      const findItems = state.items.find(obj => obj.id === action.payload.id);
      if ( findItems ) {
        findItems.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeItem(state, action){
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = calculateTotalPrice(state.items)
    },
    minusItem(state, action){
      const findItems = state.items.find(obj => obj.id === action.payload);
      if ( findItems ) {
        findItems.count--
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    clearItem(state){
      state.items = []
      state.totalPrice = 0;
    }
  },
});

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;
