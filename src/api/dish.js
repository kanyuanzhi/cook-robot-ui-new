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
