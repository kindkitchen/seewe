import { Brickyard } from "@nik-kita/brickyard"
import { google_access_token_from_code } from "./utils/google_auth.ts"
import { interceptor } from "./bricks.interceptor.ts"

export const bricks = Brickyard.init(interceptor).enroll({
  google_access_token_from_code,
})
