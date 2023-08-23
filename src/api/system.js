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

export function getQrCode() {
  return api({
    url: "/system/qrCode",
    method: "get"
  });
}

export function getSoftwareInfo() {
  return api({
    url: "/system/softwareInfo",
    method: "get"
  });
}

export function checkUpdateInfo() {
  return api({
    url: "/system/checkUpdateInfo",
    method: "get"
  });
}
