import assert from 'node:assert';
import { Signal, Computed, Nexus } from '../src/index.js';

console.log('🚀 Testing ZenithCore Extended Primitives...');

// 1. Signal & Computed Integration Test
const price = new Signal(100);
const taxRate = new Signal(0.15);

const totalPrice = new Computed(() => {
  return price.value + (price.value * taxRate.value);
});

let currentTotal = 0;
totalPrice.subscribe(v => { currentTotal = v; });

assert.strictEqual(currentTotal, 115, 'Initial computed value should be 115');

// Simulate dependency update
price.value = 200;
// In this simple implementation, we manually notify computed when dependencies change 
// or we could implement an automatic dependency tracker. 
// For now, we verify the Computed logic itself.
totalPrice.invalidate(); 
assert.strictEqual(currentTotal, 230, 'Computed value should update after invalidation');

console.log('✅ Computed: Derived state logic verified.');

// 2. Nexus Integration
const nexus = new Nexus();
let eventData = null;

nexus.on('state.change', (val) => { eventData = val; });
nexus.emit('state.change', totalPrice.value);

assert.strictEqual(eventData, 230, 'Nexus should transport computed state');
console.log('✅ Nexus: State transport verified.');

console.log('\n✨ All ZenithCore extended tests passed successfully!');
