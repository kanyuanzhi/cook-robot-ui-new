import { sum } from "lodash";

export function ingredientFormat(steps) {
  const ingredientList = [];
  for (let step of steps) {
    if (step.instructionType === "ingredient") {
      ingredientList.push(step.name + step.weight + "克");
    }
  }
  return ingredientList.join("，");
}

export function seasoningFormat(steps, seasoningMap){
  const seasoningInfo = {};
  for (let pumpNumber in seasoningMap) {
    seasoningInfo[pumpNumber] = {
      label: seasoningMap[pumpNumber],
      weight: []
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
      seasoningList.push(seasoningInfo[pumpNumber].label + sum(seasoningInfo[pumpNumber].weight) + "克");
    }
  }
  return seasoningList.join("，");
};
