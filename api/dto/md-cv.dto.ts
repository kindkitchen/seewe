import { z } from "zod"

export const MdCvDto = z.object({
  user_id: z.number(),
  md: z.string(),
  html: z.string(),
  _id: z.number().optional(),
  is_published: z.boolean(),
  name: z.string().optional(),
  publish_slug: z.string().optional(),
})

export const MdCvEntityDto = MdCvDto.omit({ _id: true }).extend({
  _id: z.number(),
})

export type MdCv = z.infer<typeof MdCvDto>
export type MdCvEntity = z.infer<typeof MdCvEntityDto>
