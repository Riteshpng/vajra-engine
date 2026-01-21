# ⚡ Vajra: High-Frequency Order Matching Engine

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Runtime](https://img.shields.io/badge/runtime-Bun_v1.0-black?logo=bun)
![Latency](https://img.shields.io/badge/latency-sub--millisecond-brightgreen)

**Vajra** is a specialized, in-memory **Limit Order Book (LOB)** and matching engine designed for high-frequency trading simulations.

It implements a **Price-Time Priority (FIFO)** matching algorithm running on a single-threaded event loop, effectively eliminating race conditions without the need for complex database write-locks.

---

## 🚀 Key Features

* **⚡ In-Memory Execution:** Order matching happens in RAM using optimized data structures (Sorted Arrays), achieving `O(n)` insertion and matching.
* **🏎️ Lock-Free Concurrency:** Leveraging Bun's single-threaded runtime to process orders sequentially, ensuring data consistency without mutexes.
* **📡 Redis Pub/Sub:** Decoupled architecture where the Engine publishes match events to Redis, keeping the matching loop pure and fast.
* **📊 Real-Time Dashboard:** A Zero-Dependency HTML/JS dashboard (polled via WebSocket) to visualize Market Depth and Trade Tape.

---

## 🏗️ Architecture

The system follows a unidirectional data flow to maximize throughput:

```mermaid
graph LR
    A[Trader/Bot] -- HTTP POST --> B(API Gateway)
    B -- Push to Queue --> C{Vajra Engine}
    C -- Match Logic --> D[Order Book RAM]
    C -- Event: TRADE --> E[Redis Pub/Sub]
    E -- WebSocket --> F[Live Dashboard]
🛠️ Tech Stack
Runtime: Bun (Chosen for native WebSocket support and faster startup than Node.js).

Language: TypeScript (Strict typing for financial accuracy).

Message Bus: Redis (Pub/Sub for broadcasting trades).

Frontend: Vanilla JS + TailwindCSS (No framework bloat).

⚡ Quick Start
1. Prerequisites
Bun installed.

Redis server running locally.

2. Installation
Bash
git clone [https://github.com/YOUR_USERNAME/vajra-engine.git](https://github.com/YOUR_USERNAME/vajra-engine.git)
cd vajra-engine
bun install
3. Run the Engine
Bash
bun index.ts
4. Run the Market Maker (Simulation)
Open a second terminal to spawn a high-frequency trading bot:

Bash
bun simulation.ts
5. View the Dashboard
Open http://localhost:3000 in your browser.

🧠 Matching Logic (Price-Time Priority)
The core engine uses a while loop to clear the spread immediately upon order entry:

TypeScript
// Simplified Logic
while (bids[0].price >= asks[0].price) {
    const tradeQty = Math.min(bids[0].qty, asks[0].qty);
    executeTrade(tradeQty);
    
    // If order is filled, remove from book
    if (bids[0].qty === 0) bids.shift();
    if (asks[0].qty === 0) asks.shift();
}
🔮 Future Roadmap
[ ] Implement Stop-Loss Orders.

[ ] Add persistence (Snapshotting RAM to Disk/DB).

[ ] Migrate core matching logic to Rust for predictable garbage collection.

Author: Ritesh Kumar Mondal