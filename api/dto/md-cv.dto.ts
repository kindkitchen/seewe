import { z } from "zod"

export const MdCvDto = z.object({
  user_id: z.number(),
  md: z.string(),
  html: z.string(),
  _id: z.number().optional(),
  is_published: z.boolean(),
  // user with username can give names to own cv
  name: z.string().optional(),
  // user without username can have 1 default cv by his own user_id
  as_default_by_user_id: z.number().optional(),
  // user with username can have 1 default cv by his username (instead the list of his cvs will be shown)
  as_default_by_username: z.string().optional(),
  // user with username can have multyple cv with names with compound uniquness ([username, cv_name])
  as_regulary_by_name_username: z.array(z.string()).length(2).optional(),
})

export const MdCvEntityDto = MdCvDto.omit({ _id: true }).extend({
  _id: z.number(),
})

export type MdCv = z.infer<typeof MdCvDto>
export type MdCvEntity = z.infer<typeof MdCvEntityDto>
