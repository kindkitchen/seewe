import { Brickyard } from "@nik-kita/brickyard"
import { interceptor } from "./bricks.interceptor"
import GoogleSignInPlugin, { useCodeClient } from "vue3-google-signin"

export const bricks = Brickyard.init(interceptor).enroll({
  google_sign_in_plugin: () =>
    [
      GoogleSignInPlugin,
      {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "none",
      },
    ] as const,
  useCodeClient,
})
