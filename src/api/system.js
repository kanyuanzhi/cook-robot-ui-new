import { api } from "boot/axios";

export function shutdown() {
  return api({
    url: "/system/shutdown",
    method: "get"
  });
}
