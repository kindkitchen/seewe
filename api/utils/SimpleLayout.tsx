import type { FC } from "hono/jsx"
import { html } from "hono/html"

const css = String.raw
export const SimpleLayout: FC = (props) => {
  const print_pdf = props.print_pfd ?? true
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css">
        </link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
        >
        </link>
        <style>
          {css`
            p, ul, ol, li, h3, h4, h5, h6 {
              break-inside: avoid-page;
              break-before: avoid-page;
            }

            p, ul, ol, li, h1, h2, h3, h4, h5, h6 {
              break-after: avoid-page;
            }

            h1, h2 {
              text-wrap: pretty;
              break-before: auto;
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

            img {
              float: left;
              margin: 0 1em 1em 0;
            }

            @media print {
              .no-print, .no-print * {
                display: none !important;
                opacity: 0.5
              }
            }
          `}
        </style>
      </head>
      <body id="container">
        {print_pdf && (
          <a
            href="#"
            id="print"
            class={"no-print"}
            onClick={() => {
              const all_details = document.getElementsByTagName("details");
              for (const d of all_details) {
                d.open = true
              }
            }}
          >
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
