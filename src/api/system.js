import { api } from "boot/axios";

export function shutdown() {
  return api({
    url: "/system/shutdown",
    method: "get"
  });
}

export function checkUpdatePermission() {
  return api({
    url: "/system/checkUpdatePermission",
    method: "get"
  });
}
