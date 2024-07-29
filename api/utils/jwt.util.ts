import {
  create,
  decode,
  getNumericDate,
  type Header,
  type Payload,
  verify,
} from "@wok/djwt"
import { convert_to_crypto_key } from "./convert_crypto_key.util.ts"

export const sign_jwt = async ({
  user_id,
  issuer,
  privateKeyPem,
  expiresIn,
}: {
  user_id: number
  issuer: string
  privateKeyPem: "ACCESS_TOKEN_PRIVATE_KEY" | "REFRESH_TOKEN_PRIVATE_KEY"
  expiresIn: Date
}): Promise<{ token: string }> => {
  const header: Header = {
    alg: "RS256",
    typ: "JWT",
  }

  const nowInSeconds = Math.floor(Date.now() / 1000)
  const tokenExpiresIn = getNumericDate(expiresIn)

  const payload: Payload = {
    iss: issuer,
    iat: nowInSeconds,
    exp: tokenExpiresIn,
    sub: user_id.toString(),
  }

  const crytoPrivateKey = await convert_to_crypto_key({
    pemKey: atob(Deno.env.get(privateKeyPem) as unknown as string),
    type: "PRIVATE",
  })

  const token = await create(header, payload, crytoPrivateKey!)

  return { token }
}

export const verify_jwt = async <T extends Payload>({
  token,
  publicKeyPem,
}: {
  token: string
  publicKeyPem: "ACCESS_TOKEN_PUBLIC_KEY" | "REFRESH_TOKEN_PUBLIC_KEY"
}): Promise<T | null> => {
  try {
    const crytoPublicKey = await convert_to_crypto_key({
      pemKey: atob(Deno.env.get(publicKeyPem) as unknown as string),
      type: "PUBLIC",
    })

    return (await verify(token, crytoPublicKey!)) as T
  } catch (error) {
    console.error(error)
    return null
  }
}

export function decode_jwt<T extends object>(
  token: string,
): {
  header: unknown
  payload: T
  signature: Uint8Array
} {
  const [header, payload, signature] = decode(token)

  return {
    header,
    payload: payload as T,
    signature,
  }
}
