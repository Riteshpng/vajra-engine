// index.ts
import { processOrder, orderBook } from "./engine";
import type { Order } from "./types";

console.log("🚀 Vajra Engine is running...");

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // 1. Serve the Frontend Dashboard (The Visuals)
    if (url.pathname === "/") {
        return new Response(Bun.file("dashboard.html"));
    }

    // 2. API to get the current State (For the Dashboard)
    if (url.pathname === "/book") {
        return new Response(JSON.stringify(orderBook), { 
            headers: { "Access-Control-Allow-Origin": "*" } 
        });
    }

    // 3. API to Place Orders (For the Simulation)
    if (url.pathname === "/order" && req.method === "POST") {
        const body = await req.json() as any;
        const order: Order = {
            id: Math.random().toString(),
            price: Number(body.price),
            quantity: Number(body.quantity),
            type: body.type
        };
        processOrder(order);
        return new Response("Order Placed", { headers: { "Access-Control-Allow-Origin": "*" } });
    }

    return new Response("Vajra Engine Running");
  },
});