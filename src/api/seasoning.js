import { api } from "src/boot/axios";

export function getSeasonings() {
  return api({
    url: "/seasonings",
    method: "get"
  });
}
