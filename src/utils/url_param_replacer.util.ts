const BETWEEN_CURLY_REGEX = /\{[^{}]+\}/g;
const AFTER_COLON_REGEX = /:[^\\/]+/g;

const between_curly = (url: string, params: Record<string, string>): string => {
  return url.replace(BETWEEN_CURLY_REGEX, (match) => {
    const key = match.slice(1, -1);
    return params[key] || match;
  });
};

const after_colon = (url: string, params: Record<string, string>): string => {
  return url.replace(AFTER_COLON_REGEX, (match) => {
    const key = match.slice(1);
    return params[key] || match;
  });
};

export const url_param_replacer = {
  between_curly,
  after_colon,
};
