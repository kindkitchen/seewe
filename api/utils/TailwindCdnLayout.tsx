import type { FC } from "hono/jsx"

export const TailwindCdnLayout: FC = (props) => {
  return (
    <html>
      <head>
        <style>
          {`\
p, ul, ol, li, h3, h4, h5, h6 {
  break-inside: avoid-page;
  break-before: avoid-page;
}

p, ul, ol, li, h1, h2, h3, h4, h5, h6 {
  break-after: avoid-page;
}

h1 {
  text-align: center;
}

h1, h2 {
  text-wrap: pretty;
  break-before: auto;
}

hr {
  border: none;
  border-top: 1px dotted;
  break-after: auto;
  background-color: green;
}

.water-mark {
  position: fixed;
  right: 2rem;
  top: 2rem;
}

body {
  color: black;
  padding-inline: 2rem;
  padding-top: 2rem;
}
\
`}
        </style>
      </head>
      <body>
        {props.children}
        <a class={"water-mark"} href="https://seewe.deno.dev">
          seewe.deno.dev
        </a>
      </body>
    </html>
  )
}
