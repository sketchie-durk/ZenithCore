/**
 * ZenithCore Reactive Primitive: Computed
 * A derived state primitive that automatically re-calculates based on dependencies.
 */
export class Computed {
  #derive;
  #value;
  #dirty = true;
  #subscribers = new Set();

  constructor(derive) {
    this.#derive = derive;
  }

  get value() {
    if (this.#dirty) {
      this.#value = this.#derive();
      this.#dirty = false;
    }
    return this.#value;
  }

  // Called by dependencies to mark this computed value as stale
  invalidate() {
    this.#dirty = true;
    this.#notify();
  }

  subscribe(callback) {
    this.#subscribers.add(callback);
    callback(this.value);
    return () => this.#subscribers.delete(callback);
  }

  #notify() {
    for (const callback of this.#subscribers) {
      callback(this.value);
    }
  }
}
