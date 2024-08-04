import { db } from "../db.ts"
import { MdCv, MdCvEntity } from "../dto/md-cv.dto.ts"
import { UserEntity } from "../dto/user.dto.ts"
import { unique_incremental_timestamp } from "../utils/ui/utils/random.util.ts"

const find_by_id = async (
  _id: number,
) => {
  const find_result = await db._dev_md_cv.findByPrimaryIndex("_id", _id)
  if (!find_result?.id) {
    return {
      ok: false,
      data: null,
    } as const
  }

  return {
    ok: true,
    data: find_result.value as MdCvEntity,
  } as const
}

const insert = async (mdCv: MdCv) => {
  const _id = unique_incremental_timestamp()
  const full_mdCv = {
    ...mdCv,
    _id,
  }
  const add_result = await db._dev_md_cv.add(full_mdCv)
  if (!add_result.ok) {
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

const update = async (_id: number, mdCv: MdCv) => {
  const update_result = await db._dev_md_cv.updateByPrimaryIndex(
    "_id",
    _id,
    mdCv,
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

export const mdCv_service = {
  save_as_default,
  find_by_id,
  insert,
  update,
}
