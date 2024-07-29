import { z } from "zod"

export const UserDto = z.object({
  id: z.number().int().optional(),
  email: z.string().email(),
  name: z.string().optional(),
  nik: z.string().min(3).max(16).optional(),
})

export const UserEntityDto = UserDto.pick({
  id: true,
  email: true,
}).required().merge(UserDto.pick({
  name: true,
  nik: true,
}))

export type UserEntity = z.infer<typeof UserEntityDto>
export type User = z.infer<typeof UserDto>
