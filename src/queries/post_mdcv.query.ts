import { my_fetch } from "@/my_fetch";
import type { v1_ } from "@/types/v1_.namespace";

export const post_mdcv_query = async (
  payload: v1_.Req<"post", "/v1/mdcv">["body"],
) => {
  const res = await my_fetch({
    method: "post",
    path: "/v1/mdcv",
    res_as: "application/json",
    body: payload,
  });

  return res;
};
