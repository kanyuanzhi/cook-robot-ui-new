import { sum } from "lodash";

export function ingredientFormat (steps) {
  const ingredientList = [];
  for (let step of steps) {
    if (step.instructionType === "ingredient") {
      // ingredientList.push(
      //   "菜仓" + step.slotNumber + "：" + step.name + step.weight + "克")
      ingredientList.push(step.name + step.weight + "克");
    }
  }
  return ingredientList;
  // return ingredientList.join("<br>")
}

export function seasoningFormat (steps, seasoningMap) {
  const seasoningInfo = {};
  for (let pumpNumber in seasoningMap) {
    seasoningInfo[pumpNumber] = {
      label: seasoningMap[pumpNumber],
      weight: [],
    };
  }
  for (let step of steps) {
    if (step.instructionType === "water" || step.instructionType === "oil") {
      seasoningInfo[step.pumpNumber].weight.push(step.weight);
    }
    if (step.instructionType === "seasoning") {
      for (let seasoning of step.seasonings) {
        seasoningInfo[seasoning.pumpNumber].weight.push(seasoning.weight);
      }
    }
  }
  const seasoningList = [];
  for (let pumpNumber in seasoningInfo) {
    if (seasoningInfo[pumpNumber].weight.length !== 0) {
      seasoningList.push(seasoningInfo[pumpNumber].label +
        sum(seasoningInfo[pumpNumber].weight) + "克");
    }
  }
  return seasoningList.join("，");
}

export const colors = [
  "teal-6",
  "blue",
  "red",
  "orange",
  "green",
  "purple",
  "brown",
  "pink",
  "grey",
  "teal",
  "cyan",
  "amber",
  "lime",
  "deep-orange",
  "deep-purple",
  "light-blue",
  "light-green",
  "indigo",
  "yellow",
  "blue-grey",
];

export const contentStyle = {
  backgroundColor: "rgba(0,0,0,0.02)",
  color: "#555",
};

export const contentActiveStyle = {
  backgroundColor: "#eee",
  color: "black",
};

export const thumbStyle = {
  right: "2px",
  borderRadius: "2px",
  backgroundColor: "#009688",
  height: "5px",
  opacity: "0.75",
};
