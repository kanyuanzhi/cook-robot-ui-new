import { api } from "src/boot/axios";

export function getCuisines() {
  return api({
    url: "/cuisine/list",
    method: "get",
  });
}
