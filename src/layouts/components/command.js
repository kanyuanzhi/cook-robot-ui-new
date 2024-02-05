import { LocalStorage, Notify } from "quasar";
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { postAPI } from "src/api";
import { i18n } from "src/boot/i18n";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();

const t = i18n.global.t;

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
          message: t("command.pauseToAddWarningMsg"),
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
        message: t("command.nameErrorMsg"),
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
    if (code === 1) {
      Notify.create({
        message: t("common.executeSuccessMsg"),
        type: "positive",
      });
    } else {
      Notify.create({
        message: message,
        type: "warning",
      });
    }
  } catch (e) {
    console.log(e.toString());
  }
}
