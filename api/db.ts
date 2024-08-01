import { collection, kvdex } from "jsr:@olli/kvdex"
import { MdCvDto } from "./dto/md-cv.dto.ts"
import { UserDto } from "./dto/user.dto.ts"

const kv = await Deno.openKv()

export const db = kvdex(kv, {
  _dev_users: collection(UserDto, {
    indices: {
      email: "primary",
      _id: "primary",
      nik: "primary",
    },
  }),
  _dev_md_cv: collection(MdCvDto, {
    indices: {
      _id: "primary",
      user_id: "secondary",
      is_published: "secondary",
      publish_slug: "primary",
    },
  }),
})
