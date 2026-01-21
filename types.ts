export type OrderType = "BUY" | "SELL";

export interface Order {
    id: string;
    price: number;
    quantity: number;
    type: OrderType;
}

export interface OrderBook {
    bids: Order[]; // Buy orders (sorted high to low)
    asks: Order[]; // Sell orders (sorted low to high)
}
export interface Trade {
    price: number;
    quantity: number;
    time: string;
}