import { cloneDeep } from "lodash/lang";
import { Notify } from "quasar";
import { UseSettingStore } from "stores/settingStore";
import { i18n } from "boot/i18n";

const useSettingStore = UseSettingStore();
const t = i18n.global.t;

function newStep (type, name) {
  const step = {
    key: Date.now(),
    instructionType: type,
    instructionName: name,
  };
  return step;
}

export function newIngredientStep (name, shape, weight, slotNumber) {
  const stepName = t("newStep.add") + name + (shape === "" ? "" : "（" + shape + "）") + t("newStep.space") +
    weight + t("newStep.ingredientLink") + slotNumber + t("newStep.slot");
  const step =
    newStep("ingredient", stepName);
  step["name"] = name;
  step["shape"] = shape;
  step["weight"] = weight;
  step["slotNumber"] = slotNumber;
  return step;
}

export function newSeasoningStep (seasonings) {
  const newSeasonings = [];
  const stepNames = [];
  for (let i = 0, len = seasonings.length; i < len; i++) {
    if (seasonings[i].label === "") continue;
    newSeasonings.push(cloneDeep(seasonings[i]));
    stepNames.push(seasonings[i].label + t("newStep.space") + seasonings[i].weight + t("newStep.kilogram"));
  }
  if (newSeasonings.length === 0) {
    Notify.create({
      message: t("newStep.addAtLeastOneSeasoningMsg"),
      type: "warning",
    });
    return null;
  }
  const stepName = t("newStep.add") + stepNames.join("，");
  const step =
    newStep("seasoning", stepName);
  step["seasonings"] = newSeasonings;
  return step;
}

export function newHeatStep (
  temperature, judgeType, targetTemperature, duration) {
  let judgeStr = "";
  switch (judgeType) {
    case 1:
      judgeStr = t("newStep.watchBottomTemperature") + targetTemperature + "℃";
      break;
    case 2:
      // judgeStr = "持续监测红外温度至" + targetTemperature + "℃";
      judgeStr = (useSettingStore.isNewMachine
        ? t("newStep.watchTemperature")
        : t("newStep.watchInfraredTemperature")) + targetTemperature + "℃";
      break;
    case 3:
      judgeStr = t("newStep.last") + duration + t("newStep.second");
      break;
    case 4:
      judgeStr = t("newStep.noTemperatureWatch");
      break;
    default:
      Notify.create({
        message: t("newStep.temperatureJudgeError"),
        type: "negative",
      });
      return;
  }
  const stepName = t("newStep.heat") + temperature + "℃，" + judgeStr;
  const step =
    newStep("heat", stepName);
  step["temperature"] = temperature;
  step["judgeType"] = judgeType;
  step["targetTemperature"] = targetTemperature;
  step["duration"] = duration;
  return step;
}

export function newStirFryStep (gear, duration) {
  const stepName = t("newStep.stirFry") + gear + t("newStep.stirFryLink")
    + duration + t("newStep.second");
  const step =
    newStep("stir_fry", stepName);
  step["gear"] = gear;
  step["duration"] = duration;
  return step;
}

export function newWaterStep (weight) {
  const stepName = t("newStep.addWater") + weight + t("newStep.kilogram");
  const step =
    newStep("water", stepName);
  step["weight"] = weight;
  step["pumpNumber"] = 6;
  return step;
}

export function newOilStep (weight) {
  const stepName = t("newStep.addOil") + weight + t("newStep.kilogram");
  const step =
    newStep("oil", stepName);
  step["weight"] = weight;
  step["pumpNumber"] = 1;
  return step;
}
