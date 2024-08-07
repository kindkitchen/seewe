import { rootClasses } from "@/formkit.theme"
import { tw } from "@/utils/tw.util"
import { genesisIcons } from "@formkit/icons"
import { generateClasses } from "@formkit/themes"
import { defaultConfig, plugin } from "@formkit/vue"

const input = "active:border-transparent py-[4px] text-nowrap"

export const fkPlugin = [
  plugin,
  defaultConfig({
    config: {
      rootClasses,
      classes: generateClasses({
        button: {
          input: tw(input),
        },
        submit: {
          input: tw(input),
        },
      }),
    },
    icons: {
      ...genesisIcons,
    },
  }),
] as const
