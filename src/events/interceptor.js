/**
 * ZenithCore Middleware: Interceptor
 * A higher-order function for wrapping Nexus event handlers to provide
 * logging, validation, or transformation.
 */
export function createInterceptor(handler) {
  return function(payload) {
    const start = performance.now();
    try {
      const result = handler(payload);
      const duration = performance.now() - start;
      // In a production environment, this would pipe to a internal logger
      // console.debug(`[Interceptor] Executed in ${duration.toFixed(4)}ms`);
      return result;
    } catch (error) {
      console.error(`[Interceptor] Handler failed: ${error.message}`);
      throw error;
    }
  };
}
