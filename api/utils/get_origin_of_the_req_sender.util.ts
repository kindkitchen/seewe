export const get_origin_of_the_req_sender = (req: Request): string => {
  return new URL(req.headers.get("referer")!).origin
}
