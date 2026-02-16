import "server-only";

import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

/**
 * Some Keystatic fields (like document/markdoc when stored as linked files)
 * can be returned as async functions. This helper makes consumption easy.
 */
export async function resolveMaybeAsync<T>(value: T | (() => Promise<T>)) {
  if (typeof value === "function") {
    return await (value as () => Promise<T>)();
  }
  return value;
}
