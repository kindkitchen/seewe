import { db } from "../db.ts"
import { MdCv, MdCvEntity } from "../dto/md-cv.dto.ts"
import { UserEntity } from "../dto/user.dto.ts"
import { unique_incremental_timestamp } from "../utils/ui/utils/random.util.ts"

const update = async (
  _id: number,
  mdCv: Omit<
    MdCv,
    keyof Pick<
      MdCv,
      "as_default_by_user_id" | "as_default_by_username" | "_id" | "user_id"
    >
  >,
) => {
  const db_res = await db._dev_md_cv.updateByPrimaryIndex(
    "_id",
    _id,
    mdCv,
  )
  if (!db_res.ok) {
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

const save_as_default = async (mdcv: MdCv, user: UserEntity) => {
  const _id = mdcv._id || unique_incremental_timestamp()
  if (user.nik) {
    void await db._dev_md_cv.updateByPrimaryIndex(
      "as_default_by_user_id",
      user._id,
      {
        as_default_by_user_id: undefined,
        as_default_by_username: undefined,
      },
    )
    const default_for_user = {
      ...mdcv,
      _id,
      as_default_by_username: user.nik,
      as_default_by_user_id: user._id,
    }
    const db_res = await db._dev_md_cv.upsertByPrimaryIndex({
      index: ["_id", mdcv._id],
      update: default_for_user,
      set: default_for_user,
    })
    if (db_res.ok) {
      return {
        ok: true,
        data: null,
      } as const
    } else {
      return {
        ok: false,
        data: null,
      } as const
    }
  } else {
    const default_for_nemo = {
      ...mdcv,
      _id,
      as_default_by_user_id: user._id,
      as_default_by_username: undefined,
      as_regulary_by_name_username: undefined,
      name: undefined,
      user_id: user._id,
    }
    const db_res = await db._dev_md_cv.upsertByPrimaryIndex({
      index: ["as_default_by_user_id", user._id],
      update: default_for_nemo,
      set: default_for_nemo,
    })

    if (db_res.ok) {
      return {
        ok: true,
        data: default_for_nemo,
      } as const
    } else {
      return {
        ok: false,
        data: null,
      } as const
    }
  }
}

const toggle_default = async (is_default: boolean, {
  mdcv_id,
  user,
}: {
  mdcv_id: number
  user: UserEntity
}) => {
  const target_res = await db._dev_md_cv.findByPrimaryIndex("_id", mdcv_id)
  if (!target_res?.id || target_res.value.user_id !== user._id) {
    return {
      ok: false,
      data: null,
    } as const
  }
  const target = target_res.value as MdCvEntity

  if (is_default) {
    if (!target.as_default_by_user_id) {
      void await db._dev_md_cv.updateByPrimaryIndex(
        "as_default_by_user_id",
        user._id,
        {
          as_default_by_user_id: undefined,
          as_default_by_username: undefined,
        },
      )
    } else {
      return {
        ok: true,
        data: null,
      }
    }
  }
  const db_res = await db._dev_md_cv.updateByPrimaryIndex("_id", mdcv_id, {
    as_default_by_user_id: is_default ? user._id : undefined,
    as_default_by_username: is_default ? user.name : undefined,
  })

  if (db_res.ok) {
    return {
      ok: true,
      data: null,
    } as const
  } else {
    return {
      ok: false,
      data: null,
    } as const
  }
}

const save = async (mdcv: MdCv, user: UserEntity) => {
  if (user.nik) {
    if (!mdcv.name) {
      return {
        ok: false,
        data: null,
      } as const
    }

    const _id = unique_incremental_timestamp()
    const db_res = await db._dev_md_cv.add({
      ...mdcv,
      _id,
      as_regulary_by_name_username: [user.nik, mdcv.name],
    })

    if (db_res.ok) {
      return {
        ok: true,
        data: null,
      } as const
    } else {
      return {
        ok: false,
        data: null,
      } as const
    }
  }

  return save_as_default(mdcv, user)
}

export const mdCv_service = {
  save_as_default,
  toggle_default,
  update,
  save,
}
