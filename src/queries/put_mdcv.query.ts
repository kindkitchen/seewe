import { my_fetch } from "@/my_fetch";
import type { v1_ } from "@/types/v1_.namespace";

export const put_mdcv_query = async (
  _id: number,
  payload: v1_.Req<"put", "/v1/mdcv/:mdcv_id">["body"],
) => {
  const res = await my_fetch({
    path: "/v1/mdcv/:mdcv_id",
    method: "put",
    res_as: "application/json",
    params: {
      mdcv_id: _id,
    },
    body: payload,
  });

  return res;
};
