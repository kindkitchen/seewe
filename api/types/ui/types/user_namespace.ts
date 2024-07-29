// deno-lint-ignore-file no-namespace
import type { User, UserEntity } from "@seewe/dto"
import type { OmitStrict, Prettify } from "@seewe/types"
export namespace user_ {
  export type Entity = UserEntity
  export type NoId = Prettify<OmitStrict<User, "id">>
  export type Optional = Prettify<Partial<User>>
}
