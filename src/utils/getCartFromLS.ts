import { CartItem } from './../redux/slices/cart/types';
import { calculateTotalPrice } from './calculateTotalPrice';
export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calculateTotalPrice(items);

    return {
        items: items as CartItem[],
        totalPrice,
    }
}