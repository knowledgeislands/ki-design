/**
 * Stands in for `node:crypto` in the browser. tessera-tokens imports `createHash` to fingerprint its CSS when it
 * builds; the stories never call that, and saying so loudly is better than a silent wrong digest.
 */
export function createHash(): never {
  throw new Error('node:crypto is not available in Storybook; build the token CSS with bun instead')
}
