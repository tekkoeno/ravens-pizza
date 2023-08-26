import { CartItem } from './../redux/slices/cart/types';
export const calculateTotalPrice = (items: CartItem[]) => {
    return items.reduce((obj, sum) => sum.price * sum.count + obj, 0);
}