import { api } from "src/boot/axios";

export function getDishes(pageIndex, pageSize, cuisineID) {
  return api({
    url: "/dishes",
    method: "get",
    params: {
      pageIndex,
      pageSize,
      cuisineID
    },
  });
}

export function getAllDishes(pageIndex, pageSize, cuisineID) {
  return api({
    url: "/allDishes",
    method: "get",
    params: {
      pageIndex,
      pageSize,
      cuisineID
    },
  });
}

export function getDish(uuid) {
  return api({
    url: "/dish",
    method: "get",
    params: {
      uuid,
    },
  });
}

export function createDish(dish) {
  return api({
    url: "/dish",
    method: "post",
    data: dish,
  });
}

export function updateDish(dish) {
  return api({
    url: "/dish",
    method: "put",
    data: dish,
  });
}

export function deleteDish(uuid) {
  return api({
    url: "/dish",
    method: "DELETE",
    params: { uuid },
  });
}

export function getCustomDishes(dishUuid) {
  return api({
    url: "/customDishes",
    method: "get",
    params: {
      dishUuid,
    },
  });
}

export function updateCustomDish(uuidToSteps) {
  return api({
    url: "/customDishes",
    method: "put",
    data: { uuidToSteps: uuidToSteps },
  });
}
