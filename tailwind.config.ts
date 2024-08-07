import type { Config } from "tailwindcss";
import headlessUi from "@headlessui/tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import primePlugin from "tailwindcss-primeui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    headlessUi({ prefix: "ui" }),
    primePlugin,
  ],
} satisfies Config;
