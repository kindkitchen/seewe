import type { user_ } from "@/types/user_namespace"

const update_bearers = (
  tokens: {
    access_token: string
    refresh_token: string
  } | null,
) => {
  if (tokens) {
    localStorage.setItem("access_token", tokens.access_token)
    localStorage.setItem("refresh_token", tokens.refresh_token)
  } else {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }
}

const get_bearers = () => {
  const access_token = localStorage.getItem("access_token")
  const refresh_token = localStorage.getItem("refresh_token")

  return access_token && refresh_token ? { access_token, refresh_token } : null
}

const restore_user = () => {
  try {
    const candidate_str = localStorage.getItem("user")
    const candidate = candidate_str ? JSON.parse(candidate_str) : undefined
    if (typeof candidate?.id === "number") {
      return candidate as user_.Entity
    }
    return undefined
  } catch {
    return undefined
  }
}

const rewrite_user = (user: user_.Optional | null) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user))
  } else {
    localStorage.removeItem("user")
  }
}

export const stuff = {
  update_bearers,
  get_bearers,
  restore_user,
  rewrite_user,
}
