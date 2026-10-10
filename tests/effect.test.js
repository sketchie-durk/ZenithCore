import assert from 'node:assert';
import { Signal, Effect } from '../src/index.js';

console.log('🚀 Testing ZenithCore Side-Effect Orchestration...');

// 1. Effect Bind Test
const state = new Signal('initial');
let effectCount = 0;

const effect = new Effect(() => {
  effectCount++;
  return () => {
    // Cleanup logic
  };
});

effect.bind(state); 
// First run occurs upon bind because Signal.subscribe executes immediately
assert.strictEqual(effectCount, 1, 'Effect should run immediately upon binding');

state.value = 'updated';
assert.strictEqual(effectCount, 2, 'Effect should run when signal updates');

// 2. Effect Cleanup Test
let cleanupCalled = false;
const cleanEffect = new Effect(() => {
  return () => { cleanupCalled = true; };
});

cleanEffect.bind(state);
state.value = 'trigger_cleanup'; 
// The second run triggers the cleanup of the first run
assert.strictEqual(cleanupCalled, true, 'Cleanup function should be called before re-execution');

console.log('✅ Effect: Reactive side-effect orchestration verified.');
console.log('\n✨ All ZenithCore effect tests passed successfully!');
