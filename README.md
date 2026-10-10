# 🌌 ZENITH CORE

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build: Passing](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Zero-Dependency](https://img.shields.io/badge/Deps-0-orange.svg)]()
[![Environment: Universal](https://img.shields.io/badge/Env-Universal-purple.svg)]()

**STATUS: ALPHA | VERSION: 0.1.0 | CODENAME: QUANTUM_FLOW**

`ZenithCore` is a high-density, zero-dependency universal orchestration engine. It provides an environment-agnostic layer for reactive state management and decoupled event communication, designed to run with maximum efficiency across Node.js, Bun, Deno, and the Browser.

## 💎 Core Primitives

### 1. `Signal` (Reactive State)
A fine-grained reactive primitive. Unlike traditional state managers, `Signal` implements a direct observer pattern that ensures $O(1)$ updates and immediate synchronization.
- **Zero Overhead:** No complex dependency trees or virtual DOM reconciliation.
- **Sync-First:** Immediate execution of subscribers upon value mutation.

### 2. `Nexus` (Event Orchestration)
A high-throughput event bus facilitating extreme decoupling between system modules.
- **Channel-Based:** Dynamic event channel creation.
- **Memory-Efficient:** Utilizes `Set` and `Map` for constant-time handler lookup and deletion.

## 🏗 Technical Architecture
ZenithCore avoids all external dependencies to prevent supply-chain vulnerabilities and minimize bundle size.

`State (Signal)` $\rightarrow$ `Trigger` $\rightarrow$ `Action` $\rightarrow$ `Event (Nexus)` $\rightarrow$ `Subscriber`

## 🚀 Quick Start

### Installation
```bash
npm install zenith-core
```

### Usage
```javascript
import { Signal, Nexus } from 'zenith-core';

// Reactive State
const theme = new Signal('dark');
theme.subscribe(val => console.log(`Theme changed to: ${val}`));
theme.value = 'light';

// Event Bus
const bus = new Nexus();
bus.on('sys.log', msg => console.log(`[LOG]: ${msg}`));
bus.emit('sys.log', 'System initialized.');
```

## 📜 License
Released under the MIT License.
