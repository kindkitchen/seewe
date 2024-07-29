// deno-lint-ignore-file no-explicit-any

export type Something = null | undefined | string | number | boolean | object

export type Tail<T extends any[]> = T extends [infer _first, ...infer Rest] ? Rest : never
export type OmitStrict<T extends Record<string, any>, K extends keyof T> = Omit<T, K> &
  Partial<Record<K, never>>
export type OmitReplace<
  T extends Record<string, any>,
  U extends Partial<Record<keyof T, any>>,
> = Omit<T, keyof U> & U

export type AddOrReplace<T extends Record<string, any>, U extends Record<string, any>> = Omit<
  T,
  keyof U
> &
  U
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & object
export type ResolveCb<T = any> = Parameters<ConstructorParameters<typeof Promise<T>>[0]>[0]
export type RejectCb = Parameters<ConstructorParameters<typeof Promise>[0]>[1]
