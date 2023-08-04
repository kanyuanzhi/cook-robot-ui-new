import { api } from "src/boot/axios";

export function getSeasonings() {
  return api({
    url: "/seasonings",
    method: "get"
  });
}

export function getSeasoningConfigs() {
  return api({
    url: "/seasoningConfigs",
    method: "get"
  });
}

export function updateSeasoningConfigs(uuidToRatio) {
  return api({
    url: "/seasoningConfigs",
    method: "put",
    data: {
      uuidToRatio: uuidToRatio
    }
  });
}
