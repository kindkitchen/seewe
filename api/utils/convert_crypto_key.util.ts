function rm_lines(str: string): string {
  return str.replace("\n", "")
}

function base64_to_arr_buff(b64: string): Uint8Array {
  const byteString = atob(b64)
  const byteArray = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i)
  }
  return byteArray
}

function pem_to_arr_buff(
  pemKey: string,
  type: "PUBLIC" | "PRIVATE",
): Uint8Array {
  const b64Lines = rm_lines(pemKey)
  const b64Prefix = b64Lines.replace(`-----BEGIN ${type} KEY-----`, "")
  const b64Final = b64Prefix.replace(`-----END ${type} KEY-----`, "")

  return base64_to_arr_buff(b64Final)
}
export function convert_to_crypto_key({
  pemKey,
  type,
}: {
  pemKey: string
  type: "PUBLIC" | "PRIVATE"
}): Promise<CryptoKey> | undefined {
  if (type === "PRIVATE") {
    return crypto.subtle.importKey(
      "pkcs8",
      pem_to_arr_buff(pemKey, type),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-256",
        },
      },
      false,
      ["sign"],
    )
  } else if (type === "PUBLIC") {
    return crypto.subtle.importKey(
      "spki",
      pem_to_arr_buff(pemKey, type),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: {
          name: "SHA-256",
        },
      },
      false,
      ["verify"],
    )
  }
}
