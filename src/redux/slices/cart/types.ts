export type CartItem = {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    types: number[],
    sizes: number[],
    count: number
}
export interface CartItemSlice {
    items: CartItem[],
    totalPrice: number,
}