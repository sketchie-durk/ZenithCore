import assert from 'node:assert';
import { Signal, Nexus } from '../src/index.js';

console.log('🚀 Testing ZenithCore Core Primitives...');

// 1. Signal Test
const count = new Signal(0);
let countVal = 0;
count.subscribe(v => { countVal = v; });

assert.strictEqual(countVal, 0, 'Initial signal value should be synced');
count.value = 10;
assert.strictEqual(countVal, 10, 'Signal update should trigger subscriber');
console.log('✅ Signal: Reactive state sync verified.');

// 2. Nexus Test
const nexus = new Nexus();
let eventReceived = false;
const payload = { data: 'zenith_pulse' };

nexus.on('system.init', (p) => {
  assert.deepStrictEqual(p, payload, 'Event payload should be intact');
  eventReceived = true;
});

nexus.emit('system.init', payload);
assert.strictEqual(eventReceived, true, 'Event should be delivered to subscriber');
console.log('✅ Nexus: Event orchestration verified.');

console.log('\n✨ All ZenithCore tests passed successfully!');
