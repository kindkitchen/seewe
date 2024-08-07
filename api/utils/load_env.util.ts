import { load } from "@std/dotenv"
import { join } from "@std/path"

export const load_env = <T = Record<string, string>>(
  options: {
    make_export_to_Deno_env?: boolean
    envFolderPathRelatedToDenoCwd?: string
    envFileName?: string
  } = {},
): Promise<T> => {
  const { envFileName = ".env", make_export_to_Deno_env = true } = options
  const { envFolderPathRelatedToDenoCwd = "" } = options

  return load({
    envPath: join(Deno.cwd(), envFolderPathRelatedToDenoCwd, envFileName),
    export: make_export_to_Deno_env,
  }) as Promise<T>
}
