export type CartItem = {
    id: string,
    name: string,
    price: number,
    count: number,
    imageUrl: string,
    types: number[],
    sizes: number[],
}
export interface CartSliceItem {
    items: CartItem[],
    totalPrice: number,
}