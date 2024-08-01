import { db } from "../db.ts"
import { MdCv, MdCvEntity } from "../dto/md-cv.dto.ts"
import { unique_incremental_timestamp } from "../utils/ui/utils/random.util.ts"

const find_by = async <T extends ("_id" | "publish_slug")>(
  by: T,
  value: T extends ("_id") ? number : string,
) => {
  const find_result = await db._dev_md_cv.findByPrimaryIndex(by, value as any)
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

export const mdCv_service = {
  find_by_id: (_id: number) => find_by("_id", _id),
  fund_by_slug: (slug: string) => find_by("publish_slug", slug),
  insert,
  update,
}
