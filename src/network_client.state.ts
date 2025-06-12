import { stuff } from "./stuff";

export const network_client_state = {
  refresh: (stuff.get_bearers() ? { status: "ok" } : { status: "none" }) as
    | { status: "none" }
    | { status: "ok" }
    | { status: "processing"; result: Promise<true | false> },
};
