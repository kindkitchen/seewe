// deno-lint-ignore-file require-await
import { unique_incremental_timestamp } from "../utils/ui/utils/random.util.ts"
import { User } from "../dto/user.dto.ts"

const MOCK_DB = new Map<string, Map<string, User>>([
  ["id", new Map()],
  ["email", new Map()],
])

const find_by = async (by: "id" | "email", value: string) => {
  const user = MOCK_DB.get(by)?.get(value)

  if (!user) {
    return {
      ok: false,
      data: null,
    } as const
  }

  return {
    ok: true,
    data: user as InsertedUser,
  } as const
}

const insert = async (user: User) => {
  const id = unique_incremental_timestamp()
  const id_str = id.toString()
  const full_user = {
    ...user,
    id,
  }
  MOCK_DB.get("id")?.set(id_str, full_user)
  MOCK_DB.get("email")?.set(user.email, full_user)

  return {
    ok: true,
    data: id,
  } as const
}

const update = async (id: number, user: User) => {
  const prev = MOCK_DB.get("id")?.get(id.toString())

  if (!prev) {
    return { ok: false, data: null } as const
  }

  MOCK_DB.get("id")?.set(id.toString(), {
    ...prev,
    ...user,
  })

  return { ok: true, data: null } as const
}

const list = async () => {
  const users = MOCK_DB.get("id") || new Map()
  return Array.from(users.values())
}

type InsertedUser = User & Required<Pick<User, "id">>
export const users_service = {
  find_by_id: (id: string) => find_by("id", id),
  find_by_email: (email: string) => find_by("email", email),
  insert,
  update,
  upsert: async (user: User) => {
    if (user.id) {
      return update(user.id, user)
    }

    return insert(user)
  },
  finsert_by_email: async (
    user: User,
  ): Promise<{ ok: true; data: InsertedUser } | { ok: false; data: null }> => {
    const found = await users_service.find_by_email(user.email)

    if (found.ok) {
      return found as { ok: true; data: InsertedUser }
    }

    const inserted = await users_service.insert(user)

    if (inserted.ok) {
      return {
        ok: true,
        data: {
          ...user,
          id: inserted.data,
        },
      } as { ok: true; data: InsertedUser }
    }

    return {
      ok: false,
      data: null,
    }
  },
  list,
}
