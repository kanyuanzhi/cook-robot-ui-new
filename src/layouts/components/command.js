import { Notify } from "quasar";
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { postAPI } from "src/api";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();

export async function sendCommand (commandName, commandData = {}) {
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
        Notify.create({
          message: "为确保安全，请在机器运行至翻炒位时中途加料",
          type: "warning",
        });
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
    case "shutdown":
      commandType = "single";
      break;
    default:
      Notify.create({
        message: "命令名称错误",
        type: "warning",
      });

      return;
  }
  try {
    const { code, message } = await postAPI("controller/execute", {
      commandType: commandType,
      commandName: commandName,
      commandData: commandData,
    });
    Notify.create({
      message: message,
      type: code === 1 ? "positive" : "warning",
    });
  } catch (e) {
    console.log(e.toString());
  }
}
