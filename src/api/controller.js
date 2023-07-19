import { api } from "src/boot/axios";

export function execute(commandType, commandName, commandData) {
  return api({
    url: "/controller/execute",
    method: "post",
    data: {
      commandType,
      commandName,
      commandData
    }
  });
}

export function fetchStatus(uuid) {
  return api({
    url: "/controller/fetchStatus",
    method: "get"
  });
}
