import { my_fetch } from "@/my_fetch";

export const get_my_mdcvs_query = async () => {
  const res = await my_fetch({
    method: "get",
    path: "/v1/mdcv",
    res_as: "application/json",
  });

  return res.items;
};
