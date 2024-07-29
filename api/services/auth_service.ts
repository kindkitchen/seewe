import { sign_jwt } from "../utils/jwt.util.ts"
import { type DotenvFile } from "../env.d.ts"

export async function generate_token_pair(user_id: number) {
  const accessTokenExpiresIn = new Date(
    Date.now() +
      +Deno.env.get("ACCESS_TOKEN_EXPIRES_IN" satisfies keyof DotenvFile)! *
        60 *
        1000,
  )
  const refreshTokenExpiresIn = new Date(
    Date.now() +
      +Deno.env.get("REFRESH_TOKEN_EXPIRES_IN" satisfies keyof DotenvFile)! *
        60 *
        1000,
  )
  const issuer = Deno.env.get("VITE_API_URL" satisfies keyof DotenvFile)!
  const [{ token: access_token }, { token: refresh_token }] = await Promise.all(
    [
      sign_jwt({
        user_id,
        privateKeyPem: "ACCESS_TOKEN_PRIVATE_KEY",
        expiresIn: accessTokenExpiresIn,
        issuer,
      }),
      sign_jwt({
        user_id,
        privateKeyPem: "REFRESH_TOKEN_PRIVATE_KEY",
        expiresIn: refreshTokenExpiresIn,
        issuer,
      }),
    ],
  )

  return {
    access_token,
    refresh_token,
  }
}
