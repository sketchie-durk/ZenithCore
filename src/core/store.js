/**
 * ZenithCore State Container: Store
 * A unified container for managing a collection of Signals.
 */
import { Signal } from '../reactive/signal.js';

export class Store {
  #state = new Map();

  /**
   * Define or update a piece of state in the store.
   * @param {string} key - The state identifier.
   * @param {any} value - The initial value.
   */
  define(key, value) {
    if (!this.#state.has(key)) {
      this.#state.set(key, new Signal(value));
    }
    return this.#state.get(key);
  }

  /**
   * Get a signal by its key.
   * @param {string} key 
   * @returns {Signal}
   */
  get(key) {
    const signal = this.#state.get(key);
    if (!signal) throw new Error(`State key "${key}" is not defined in ZenithStore.`);
    return signal;
  }

  /**
   * Update a state value directly.
   * @param {string} key 
   * @param {any} value 
   */
  set(key, value) {
    this.get(key).value = value;
  }

  /**
   * Returns a snapshot of the current state.
   */
  snapshot() {
    const snap = {};
    for (const [key, signal] of this.#state) {
      snap[key] = signal.value;
    }
    return snap;
  }
}
