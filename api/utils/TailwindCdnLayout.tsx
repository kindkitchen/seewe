import type { FC } from "hono/jsx"

export const TailwindCdnLayout: FC = (props) => {
  return (
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          {`\
p, ul, ol, li, h3, h4, h5, h6 {
  break-inside: avoid-page;
  break-before: avoid-page;
}

p, ul, ol, li, h1, h2, h3, h4, h5, h6 {
  break-after: avoid-page;
}

h1, h2 {
  break-before: auto;
}

hr {
  border: none;
  border-top: 1px dotted;
  break-after: auto;
  background-color: magenta;
}
\
`}
        </style>
      </head>
      <body class="min-h-screen flex flex-col pl-4">{props.children}
        <a class={'fixed top-2 right-2 italic px-4 bg-neutral-50 text-neutral-600'} href="https://seewe.deno.dev">seewe.deno.dev</a>
      </body>
    </html>
  )
}
