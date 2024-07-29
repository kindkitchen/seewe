import { z } from "zod"
import { UserEntityDto } from "./user.dto"

export const AuthSchema = z.object({
  client_id: z.string(),
  code: z.string(),
  auth_provider: z.literal("google"),
})

export type Auth = z.infer<typeof AuthSchema>

export const BearerTokenSchema = z
  .string()
  .regex(/Bearer \S+/)
  .transform((arg) => arg.split(" ")[1]!)

export const SuccessSignInSchema = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.literal("Bearer"),
  })
  .merge(UserEntityDto)
