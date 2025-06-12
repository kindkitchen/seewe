/**
 * @description
 * You should manually create `bricks.interceptor.ts` at lease with following content.
 */
import { Brickyard } from "@nik-kita/brickyard";

export const interceptor = Brickyard.pre_init()
  .intercept("some_fn_name", {
    fn: () => {},
  })
  .complete();
