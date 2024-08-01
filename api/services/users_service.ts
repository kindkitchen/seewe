// deno-lint-ignore-file require-await
import { unique_incremental_timestamp } from "../utils/ui/utils/random.util.ts"
import { User, UserEntity } from "../dto/user.dto.ts"
import { db } from "../db.ts"

const find_by = async <T extends ("_id" | "email")>(
  by: T,
  value: T extends "_id" ? number : string,
) => {
  const find_result = await db._dev_users.findByPrimaryIndex(by, value as any)

  if (!find_result?.id) {
    return {
      ok: false,
      data: null,
    } as const
  }

  return {
    ok: true,
    data: find_result.value as UserEntity,
  } as const
}

const insert = async (user: User) => {
  const _id = unique_incremental_timestamp()
  const full_user = {
    ...user,
    _id,
  }
  const add_result = db._dev_users.add(full_user)

  if (!(await add_result).ok) {
    return {
      ok: false,
      data: null,
    } as const
  }

  return {
    ok: true,
    data: _id,
  } as const
}

const update = async (_id: number, user: User) => {
  const update_result = await db._dev_users.updateByPrimaryIndex(
    "_id",
    _id,
    user,
  )

  if (!update_result.ok) {
    return {
      ok: false,
      data: null,
    } as const
  }

  return {
    ok: true,
    data: null,
  } as const
}

const list = async () => {
  const users = [] as UserEntity[]
  await db._dev_users.forEach((u) => users.push(u.value as UserEntity))

  return {
    ok: true,
    data: users,
  } as const
}

export const users_service = {
  find_by_id: (_id: number) => find_by("_id", _id),
  find_by_email: (email: string) => find_by("email", email),
  insert,
  update,
  upsert: async (user: User) => {
    if (user._id) {
      return update(user._id, user)
    }

    return insert(user)
  },
  finsert_by_email: async (
    user: User,
  ) => {
    const found = await users_service.find_by_email(user.email)

    if (found.ok) {
      return {
        ok: true,
        data: found.data as UserEntity,
      }
    }

    const inserted = await users_service.insert(user)

    if (inserted.ok) {
      return {
        ok: true,
        data: {
          ...user,
          _id: inserted.data,
        } as UserEntity,
      } as const
    }

    return {
      ok: false,
      data: null,
    } as const
  },
  list,
}
