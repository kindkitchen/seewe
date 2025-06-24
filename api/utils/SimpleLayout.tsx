import type { FC } from "hono/jsx"
import { html } from "hono/html"

const css = String.raw
export const SimpleLayout: FC = (props) => {
  const print_pdf = props.print_pfd ?? true
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://newcss.net/theme/night.css"></link>
        <style>
          {css`
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

            @media print {
              .no-print, .no-print * {
                display: none !important;
              }
            }
          `}
        </style>
      </head>
      <body id="container">
        {print_pdf && (
          <a href="#" id="print" class={"no-print"}>
            <button>Download as PDF</button>
          </a>
        )}
        {props.children}
        <div class={"water-mark"}>
          {props.link && (
            <a href={props.link}>See actual online version of this CV</a>
          )}
          <br />
          <a href="https://seewe.deno.dev">Use our service at seewe.deno.dev</a>
        </div>
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
