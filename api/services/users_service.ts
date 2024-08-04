// deno-lint-ignore-file require-await
import { db } from "../db.ts"
import { User, UserEntity } from "../dto/user.dto.ts"
import { unique_incremental_timestamp } from "../utils/ui/utils/random.util.ts"

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

const update = async (
  _id: number,
  user: Omit<User, keyof Pick<User, "nik">>,
) => {
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

const add_nik = async (nik: string, user: UserEntity) => {
  if (user.nik) {
    return {
      ok: false,
      data: "User already has nik",
    } as const
  }

  const already = await db._dev_users.findByPrimaryIndex("nik", nik)

  if (already?.value) {
    return {
      ok: false,
      data: "This nik is already taken",
    } as const
  }

  const db_res = await db._dev_users.updateByPrimaryIndex("_id", user._id, {
    nik,
  })

  if (db_res.ok) {
    // assume it can be only one or zero cv, because without nik user can't have more
    await db._dev_md_cv.updateBySecondaryIndex("user_id", user._id, {
      as_default_by_user_id: user._id,
      as_default_by_username: nik,
    })

    return {
      ok: true,
      data: null,
    } as const
  }

  return {
    ok: false,
    data: null,
  } as const
}

export const users_service = {
  add_nik,
  find_by_id: (_id: number) => find_by("_id", _id),
  find_by_email: (email: string) => find_by("email", email),
  insert,
  update,
  upsert: async (user: Omit<User, keyof Pick<User, "nik">>) => {
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
