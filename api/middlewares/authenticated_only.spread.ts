import { z } from "zod"

export const authenticated_only = {
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    headers: z.object({
      authorization: z.string().optional(),
    }),
  },
}
