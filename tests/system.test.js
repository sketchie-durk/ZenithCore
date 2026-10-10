import assert from 'node:assert';
import { Store, Nexus, createInterceptor } from '../src/index.js';

console.log('🚀 Testing ZenithCore System Orchestration...');

// 1. Store Integration Test
const store = new Store();
store.define('user.name', 'ZenithOperator');
store.define('user.level', 99);

assert.strictEqual(store.get('user.name').value, 'ZenithOperator', 'Store signal value should match');

store.set('user.level', 100);
assert.strictEqual(store.get('user.level').value, 100, 'Store update should mutate signal');

const snap = store.snapshot();
assert.deepStrictEqual(snap, { 'user.name': 'ZenithOperator', 'user.level': 100 }, 'Snapshot should reflect current state');
console.log('✅ Store: Unified state container verified.');

// 2. Interceptor Integration Test
const nexus = new Nexus();
let handled = false;

const rawHandler = (payload) => {
  handled = true;
  return payload.toUpperCase();
};

const interceptedHandler = createInterceptor(rawHandler);
nexus.on('sys.cmd', interceptedHandler);

nexus.emit('sys.cmd', 'reboot');
assert.strictEqual(handled, true, 'Intercepted handler should be executed');
console.log('✅ Interceptor: Middleware orchestration verified.');

console.log('\n✨ All ZenithCore system tests passed successfully!');
