// simulation.ts
console.log("🤖 Market Maker Bot Started...");

function getRandomPrice() {
    return Math.floor(Math.random() * 10) + 100; // Price between 100-110
}

function getRandomQty() {
    return Math.floor(Math.random() * 5) + 1; // Qty between 1-5
}

// Infinite Loop of Orders
setInterval(async () => {
    const side = Math.random() > 0.5 ? "BUY" : "SELL";
    const price = getRandomPrice();
    const quantity = getRandomQty();

    await fetch("http://localhost:3000/order", {
        method: "POST",
        body: JSON.stringify({ price, quantity, type: side })
    });

    console.log(`🤖 Bot Placed: ${side} ${quantity} @ ${price}`);
}, 300); // New order every 300ms