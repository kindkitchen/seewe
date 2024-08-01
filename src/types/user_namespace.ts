// deno-lint-ignore-file no-namespace
import type { OmitStrict, Prettify } from "./common.types"
import type { v1_ } from "./v1_.namespace"

type User = Pick<v1_.Success<"post", "/v1/auth/sign-in", 200>, "_id" | "email" | "name" | "nik">

export namespace user_ {
  export type Entity = User
  export type NoId = Prettify<OmitStrict<User, "_id">>
  export type Optional = Prettify<Partial<User>>
}
