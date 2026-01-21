// test.ts
console.log("🧪 Running Vajra Test...");

// 1. Create a Seller (Sell 5 BTC @ $100)
console.log("➡️  Placing SELL Order...");
await fetch("http://localhost:3000/order", {
    method: "POST",
    body: JSON.stringify({ price: 100, quantity: 5, type: "SELL" })
});

// 2. Create a Buyer (Buy 3 BTC @ $100)
console.log("➡️  Placing BUY Order...");
await fetch("http://localhost:3000/order", {
    method: "POST",
    body: JSON.stringify({ price: 100, quantity: 3, type: "BUY" })
});

console.log("✅ Tests Sent!");