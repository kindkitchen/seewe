export async function google_access_token_from_code(payload: {
  code: string
  client_id: string
  client_secret: string
  redirect_uri: string
  grant_type: "authorization_code"
}): Promise<GoogleOAuthTokenRes> {
  const { code, client_id, client_secret, redirect_uri, grant_type } = payload

  const res = await fetch(EXCHANGE_TOKEN_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id,
      client_secret,
      code,
      grant_type,
      redirect_uri: encodeURI(redirect_uri),
    }),
  })

  if (res.ok) {
    const data = await res.json()

    return data as GoogleOAuthTokenRes
  }

  console.error(res)

  throw new Error(
    `Failed to exchange code for token: ${res.status} | ${res.statusText}`,
  )
}
const EXCHANGE_TOKEN_URL = "https://oauth2.googleapis.com/token"

export type GoogleAccessTokenFromCodePayload = Parameters<
  typeof google_access_token_from_code
>[0]
export type GoogleOAuthTokenRes = {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
  id_token: string
}
export type GoogleAuthJwtPayload = {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
}
