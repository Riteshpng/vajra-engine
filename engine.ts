// engine.ts
import type { Order, OrderBook, Trade } from "./types";

// We extend the "Database" to hold trade history
export const orderBook: OrderBook & { trades: Trade[] } = {
    bids: [],
    asks: [],
    trades: [] // New: Stores the history
};

export function processOrder(order: Order) {
    if (order.type === "BUY") {
        orderBook.bids.push(order);
        orderBook.bids.sort((a, b) => b.price - a.price);
    } else {
        orderBook.asks.push(order);
        orderBook.asks.sort((a, b) => a.price - b.price);
    }
    matchOrders();
}

function matchOrders() {
    while (orderBook.bids.length > 0 && orderBook.asks.length > 0) {
        const bestBid = orderBook.bids[0]!;
        const bestAsk = orderBook.asks[0]!;

        if (bestBid.price >= bestAsk.price) {
            const quantity = Math.min(bestBid.quantity, bestAsk.quantity);
            const price = bestAsk.price; // Trade price is determined by the maker (Seller)

            // 1. RECORD THE TRADE
            const trade: Trade = {
                price: price,
                quantity: quantity,
                time: new Date().toLocaleTimeString()
            };
            
            // Add to history (Max 50 items to save RAM)
            orderBook.trades.unshift(trade);
            if (orderBook.trades.length > 50) orderBook.trades.pop();

            console.log(`⚡ MATCH: ${quantity} BTC @ ${price}`);
            
            // 2. UPDATE BOOKS
            bestBid.quantity -= quantity;
            bestAsk.quantity -= quantity;

            if (bestBid.quantity === 0) orderBook.bids.shift();
            if (bestAsk.quantity === 0) orderBook.asks.shift();
        } else {
            break; 
        }
    }
}