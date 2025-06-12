import { my_fetch } from "@/my_fetch";
import { use_auth } from "@/stores/use_auth.store";

export const put_update_nik = async (nik: string) => {
  const res = await my_fetch({
    method: "put",
    path: "/v1/users/nik/:nik",
    params: {
      nik,
    },
    res_as: "application/json",
  });

  const auth = use_auth();
  if (auth.user && res.ok && typeof res.data === "string") {
    auth.upsert_user({
      ...auth.user,
      nik: res.data,
    });
  }
};
