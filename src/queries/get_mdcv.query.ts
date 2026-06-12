import { my_fetch } from "@/my_fetch";

export const get_mdcv_query = async (mdcv_id: number) => {
  const res = await my_fetch({
    method: "get",
    path: "/v1/mdcv/:mdcv_id",
    params: { mdcv_id },
    res_as: "application/json",
  });

  return res;
};
