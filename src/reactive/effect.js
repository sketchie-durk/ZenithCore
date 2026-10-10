import { context } from '../core/context.js';
import { Signal } from './signal.js';

/**
 * ZenithCore Reactive Primitive: Effect
 * A managed wrapper for side-effects with automatic dependency tracking.
 */
export class Effect {
  #fn;
  #signalDeps = new Set();
  #cleanup = null;

  constructor(fn) {
    this.#fn = fn;
  }

  /**
   * Executes the effect and automatically tracks any Signals accessed during execution.
   */
  run() {
    const prevEffect = context.activeEffect;
    context.activeEffect = this;
    
    // Clear dependencies before re-evaluating to ensure current trace
    this.#signalDeps.clear();
    
    if (this.#cleanup) {
      this.#cleanup();
    }

    try {
      const result = this.#fn();
      if (typeof result === 'function') {
        this.#cleanup = result;
      }
    } catch (error) {
      console.error(`[ZenithEffect] Execution error: ${error.message}`);
    } finally {
      context.activeEffect = prevEffect;
    }
  }

  /**
   * Manually bind a signal to this effect. 
   * Note: This is now redundant with auto-tracking but kept for explicit control.
   */
  bind(dependency) {
    if (!(dependency instanceof Signal)) {
      throw new TypeError('Effect can only be bound to Signal instances.');
    }
    this.#signalDeps.add(dependency);
    dependency.subscribe(() => this.run());
  }

  dispose() {
    if (this.#cleanup) this.#cleanup();
    this.#signalDeps.clear();
  }
}
