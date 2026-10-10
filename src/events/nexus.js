/**
 * ZenithCore Event Orchestrator: Nexus
 * A high-throughput, decoupled event bus for universal environments.
 */
export class Nexus {
  #events = new Map();

  /**
   * Subscribe to a specific event channel.
   * @param {string} event - The event identifier.
   * @param {Function} callback - The handler to execute.
   * @returns {Function} Unsubscribe function.
   */
  on(event, callback) {
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    this.#events.get(event).add(callback);
    return () => this.#events.get(event).delete(callback);
  }

  /**
   * Emit an event with an optional payload.
   * @param {string} event - The event identifier.
   * @param {any} payload - Data to pass to subscribers.
   */
  emit(event, payload) {
    const handlers = this.#events.get(event);
    if (!handlers) return;
    
    for (const handler of handlers) {
      handler(payload);
    }
  }

  /**
   * Clear all subscribers for a specific event.
   */
  clear(event) {
    this.#events.delete(event);
  }
}
