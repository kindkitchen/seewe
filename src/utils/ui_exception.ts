const EXCEPTIONS_DICT = {
  login_is_required: "Please login first",
  "*": "Sorry, somethig went wrong...",
} as const;

export class UiException extends Error {
  constructor(
    message: keyof typeof EXCEPTIONS_DICT,
    suffix: number | string = "",
    err: unknown = undefined,
  ) {
    const user_friendly_message = EXCEPTIONS_DICT[message];
    super(user_friendly_message);
    this.name = "UiException";
    console.error(`\
${message}::${suffix}

=== ${user_friendly_message} ===
      ${err}
${"=".repeat(user_friendly_message.length)}\
`);
  }
}
