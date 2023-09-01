import { Notify } from "quasar";
import { execute } from "src/api/controller";
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();

export async function sendCommand(commandName, commandData = "") {
  let commandType;
  // cook型命令会在commandData中携带菜品uuid，其他commandData为空
  switch (commandName) {
    case "cook":
      commandType = "multiple";
      break;
    case "prepare":
      commandType = "multiple";
      break;
    case "wash":
      commandType = "multiple";
      break;
    case "pour":
      commandType = "multiple";
      break;
    case "dish_out":
      commandType = "multiple";
      break;
    case "withdraw":
      commandType = "multiple";
      break;
    case "pause_to_add":
      if (!useControllerStore.isPausePermitted) {
        Notify.create("为确保安全，请在机器运行至翻炒位时中途加料");
        return;
      }
      commandType = "single";
      break;
    case "resume":
      commandType = "single";
      break;
    case "door_unlock":
      commandType = "single";
      break;
    case "heat":
      commandType = "single";
      break;
    default:
      Notify.create("命令名称错误");
      return;
  }
  const { data } = await execute(commandType, commandName, commandData);
  if (data.message === "error") {
    Notify.create("机器正在执行其他命令，请稍后");
  }
}
