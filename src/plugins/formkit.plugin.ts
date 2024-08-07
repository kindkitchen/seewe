import { rootClasses } from "@/formkit.theme"
import { tw } from "@/utils/tw.util"
import { genesisIcons } from "@formkit/icons"
import { generateClasses } from "@formkit/themes"
import { defaultConfig, plugin } from "@formkit/vue"

const input = tw("active:border-transparent py-[5px] text-nowrap", {
  "dark:text-emerald-50": true,
  "dark:bg-emerald-950": true,
  "dark:hover:bg-emerald-900": true,
  "text-emerald-950": true,
  "bg-emerald-50": true,
  "hover:bg-emerald-100": true,
})

export const fkPlugin = [
  plugin,
  defaultConfig({
    config: {
      rootClasses,
      classes: generateClasses({
        text: {
          inner: "py-[3px]",
          input: "dark:text-black",
        },
        button: {
          input: tw(input),
        },
        submit: {
          input: tw(input),
        },
        global: {},
      }),
    },
    icons: {
      ...genesisIcons,
    },
  }),
] as const
