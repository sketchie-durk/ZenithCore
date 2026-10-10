/**
 * ZenithCore Reactive Primitive: Signal
 * A high-density, zero-dependency reactive state container.
 */
export class Signal {
  #value;
  #subscribers = new Set();

  constructor(initialValue) {
    this.#value = initialValue;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (this.#value === newValue) return;
    this.#value = newValue;
    this.#notify();
  }

  // Public method to trigger observers externally
  notify() {
    this.#notify();
  }

  subscribe(callback) {
    this.#subscribers.add(callback);
    // Immediate execution for initial sync
    callback(this.#value);
    return () => this.#subscribers.delete(callback);
  }

  #notify() {
    for (const callback of this.#subscribers) {
      callback(this.#value);
    }
  }
}
