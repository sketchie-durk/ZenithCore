/**
 * ZenithCore Effect Orchestrator: Effect
 * A managed wrapper for side-effects that integrates with the Signal system.
 */
export class Effect {
  #fn;
  #signalDeps = new Set();
  #cleanup = null;

  constructor(fn) {
    this.#fn = fn;
  }

  /**
   * Execute the effect.
   * @param {any} dependency - A Signal to bind the effect to.
   */
  bind(dependency) {
    if (!(dependency instanceof Signal)) {
      throw new TypeError('Effect can only be bound to Signal instances.');
    }
    
    this.#signalDeps.add(dependency);
    
    // Create the subscription to the signal
    dependency.subscribe(() => {
      this.#run();
    });
  }

  #run() {
    // Execute cleanup if it exists from previous run
    if (this.#cleanup) {
      this.#cleanup();
    }

    try {
      // Execute the effect and capture return value for cleanup
      const result = this.#fn();
      if (typeof result === 'function') {
        this.#cleanup = result;
      }
    } catch (error) {
      console.error(`[ZenithEffect] Execution error: ${error.message}`);
    }
  }

  dispose() {
    if (this.#cleanup) this.#cleanup();
    this.#signalDeps.clear();
  }
}
