import type { FC } from "hono/jsx"

export const TailwindCdnLayout: FC = (props) => {
  return (
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="h-screen flex flex-col p-4">{props.children}</body>
    </html>
  )
}
