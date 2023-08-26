import { calculateTotalPrice } from './../../../utils/calculateTotalPrice';
import { CartItemSlice } from './types';

import { createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../utils/getCartFromLS';



const initialState: CartItemSlice = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItems = state.items.find(obj => obj.id === action.payload.id);
      if ( findItems ) {
        findItems.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    removeItem(state, action){
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items)
    },
    minusItem(state, action){
      const findItems = state.items.find(obj => obj.id === action.payload);
      findItems.count--
      state.totalPrice = calculateTotalPrice(state.items)
    },
    clearItem(state){
      state.items = []
      state.totalPrice = 0;
    }

  },
});

export const {addItem, removeItem, minusItem, clearItem} = cartSlice.actions;
export default cartSlice.reducer;
