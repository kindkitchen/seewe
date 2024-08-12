import type { FC } from "hono/jsx"

export const TailwindCdnLayout: FC = (props) => {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
          integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
          crossorigin="anonymous"
        ></script>
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
