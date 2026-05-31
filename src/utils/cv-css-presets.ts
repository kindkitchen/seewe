// Starter stylesheets for a CV page. The user can pick one and then edit it
// freely — these are just starting points, not a fixed set of themes.
//
// The rendered content lives inside `pre.cv` (white-space: pre-wrap), so these
// presets mostly tune typography, spacing and colors of that block and `body`.

export type CvCssPreset = {
  name: string;
  css: string;
};

const default_css = `body {
  max-width: 50rem;
  margin: 2rem auto;
  padding: 0 1.25rem;
  color: #1f2937;
  background: #ffffff;
}

.cv {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}`;

const minimal_css = `body {
  max-width: 42rem;
  margin: 3rem auto;
  padding: 0 1rem;
  color: #111;
  background: #fff;
}

.cv {
  font-family: ui-monospace, "SFMono-Regular", monospace;
  font-size: 0.95rem;
  line-height: 1.7;
}`;

const serif_css = `body {
  max-width: 46rem;
  margin: 2.5rem auto;
  padding: 0 1.5rem;
  color: #2b2b2b;
  background: #fbfaf7;
}

.cv {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.05rem;
  line-height: 1.65;
}`;

const dark_css = `body {
  max-width: 48rem;
  margin: 2rem auto;
  padding: 1.5rem;
  color: #e5e7eb;
  background: #0f172a;
}

.cv {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.65;
}`;

export const cv_css_presets: CvCssPreset[] = [
  { name: "Default", css: default_css },
  { name: "Minimal", css: minimal_css },
  { name: "Serif", css: serif_css },
  { name: "Dark", css: dark_css },
];

export const default_cv_css = default_css;
