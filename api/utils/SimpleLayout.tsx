import type { FC } from "hono/jsx"
import { html } from "hono/html"

export const SimpleLayout: FC = (props) => {
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

body {
  color: black;
  padding-inline: 2rem;
  padding-top: 2rem;
}
.water-mark:hover {
  color: green;
}
.water-mark {
  color: lightgray;
  position: fixed;
  top: 0;
  right: 0;
}

\
`}
        </style>
      </head>
      <body id="container">
        <a href="#" id="print">
          <button>Download as PDF</button>
        </a>
        {props.children}
        <a class={"water-mark"} href="https://seewe.deno.dev">
          seewe.deno.dev
        </a>
        {html`
          <script>
            document.addEventListener(
              "DOMContentLoaded",
              () => {
                let printLink = document.getElementById("print")
                let container = document.getElementById("container")

                printLink.addEventListener(
                  "click",
                  (event) => {
                    event.preventDefault()
                    printLink.style.display = "none"
                    window.print()
                  },
                  false,
                )

                container.addEventListener(
                  "click",
                  (event) => {
                    printLink.style.display = "flex"
                  },
                  false,
                )
              },
              false,
            )
          </script>
        `}
      </body>
    </html>
  )
}
