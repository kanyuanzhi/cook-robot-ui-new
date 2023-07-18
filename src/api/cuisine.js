import { api } from "src/boot/axios";

export function getCuisines() {
  return api({
    url: "/cuisines",
    method: "get",
  });
}
