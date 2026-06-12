# Changelog

## 2026-06-12

- Add uploadable PDF representation for CVs. A CV is now either `kind: "md"`
  (markdown rendered to HTML, the legacy default) or `kind: "pdf"` (an uploaded
  file). The two are mutually exclusive per slug, but the markdown is kept on
  switch so reverting is non-destructive.
- `PUT /v1/mdcv/:mdcv_id/pdf` stores the uploaded file (raw `application/pdf`
  body, `%PDF-` magic check, 5MB cap) and flips the CV to `kind: "pdf"`;
  `DELETE /v1/mdcv/:mdcv_id/pdf` removes it and reverts to markdown.
- PDF bytes live in a separate serialized KV collection (`_dev_md_cv_pdf`,
  chunked via kvdex `serialize: "v8"`), keyed by CV id, so the blob is never
  read while rendering the CV record.
- Public serving: for a `pdf` CV, `/slug` shows the file inline and
  `/slug.pdf` downloads it; `md` CVs are unchanged (HTML render, `.pdf` still
  triggers browser print-to-PDF as the fallback).
- PDF responses are read-through cached via the Deno Web Cache API, keyed by
  `id/pdf_version/variant`, so hits skip the KV blob read and re-uploads orphan
  stale entries automatically.
- Dashboard CV list shows an MD/PDF badge and Upload/Replace/Remove PDF
  controls.

- Add `just check`: type-checks frontend with `vue-tsc` and backend with
  `deno check mod.ts`, each in its correct scope. Do not run `deno check .`
  repo-wide — Deno cannot parse Vue SFCs (`primePlugin` loses its `as const`
  tuple) and does not resolve `vite/client` ambient types (`import.meta.url`),
  producing false errors on frontend files that `vue-tsc` checks correctly.

- Fix `deno check` (5 pre-existing type errors): openapi router now imports
  `DotenvFile` from the api-local `env.d.ts` instead of the root frontend one
  (which pulls unresolvable `vite/client` types); add `deno.unstable` to the
  api `lib` so `Deno.openKv` types resolve; `convert_crypto_key.util` returns
  `Uint8Array<ArrayBuffer>` to satisfy `crypto.subtle.importKey`.

### Notes

- Legacy CV records have no `kind`; they are read as `"md"` defensively, so no
  data migration is required.
- The new endpoints are not in the generated typed client yet — run
  `just gen-types` (against a running server) to include them.
