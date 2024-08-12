import { DotenvFile } from "./env.d.ts"
import { load_env } from "./utils/load_env.util.ts"

export const config = await load_env<DotenvFile>()
