import type { FC } from "hono/jsx"

export const TailwindCdnLayout: FC = (props) => {
  return (
    <html>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        ></link>
        <style>
          {`\
p, ul, ol, li, h4, h5, h6 {
  
  break-inside: avoid-page;
  break-before: avoid-page;
}

p, ul, ol, li, h1, h2, h4, h5, h6 {
  break-after: avoid-page;
}

h1, h2, h3 {
  text-align: center;
  text-wrap: pretty;
  break-before: auto;
}

hr {
  border: none;
  border-top: 1px dotted;
  break-after: auto;
  background-color: magenta;
}

.water-mark {
  position: fixed;
  right: 2rem;
  top: 2rem;
}
\
`}
        </style>
      </head>
      <body>
        {props.children}
        <a
          class={"water-mark"}
          href="https://seewe.deno.dev"
        >
          seewe.deno.dev
        </a>
      </body>
    </html>
  )
}
