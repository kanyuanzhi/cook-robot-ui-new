<template>
  <div>
    <q-dialog v-model="useAppStore.dishDetailsCardShown" @show="onShow" @hide="onHide">
      <q-card style="width: 400px">
        <q-card-section class="q-py-md">
          <div class="bg-teal-6 q-py-sm text-center" style="border-radius: 10px;min-height: 44px">
            <span class="text-subtitle1 text-weight-bold text-white">{{ dish.name }}</span>
          </div>
        </q-card-section>
        <q-card-section class="text-grey-8 q-py-none">
          <q-img
              v-if="dish.image!==undefined"
              :src="dish.image"
              fit="fill"
              :ratio="5/4"
              @click="onImageClick(dish.uuid)"
          >
            <div class="absolute-bottom text-center">
              <q-markup-table flat dense separator="vertical" class="text-white" style="background:none">
                <tbody>
                <tr>
                  <td v-for="(ingredient, index) in ingredients" :key="index">
                    <span class="text-body2 text-weight-bold">菜仓{{ ingredient.slotNumber }}</span>
                  </td>
                </tr>
                <tr>
                  <td v-for="(ingredient, index) in ingredients" :key="index" width="10%"
                      style="word-break: break-all;white-space: normal" class="text-weight-bold">
                    {{ ingredient.format }}
                  </td>
                </tr>
                <tr>
                  <td :colspan="ingredients.length" class="text-left"
                      style="word-break: break-all;white-space: normal;">
                    <span class="text-weight-bold text-body2">调料：</span>{{
                      seasoningFormat(uuidToSteps[taste], seasoningMap)
                    }}
                  </td>
                </tr>
                </tbody>
              </q-markup-table>

              <!--              <div v-html="ingredientSummary" style="line-height: 25px"></div>-->
            </div>
          </q-img>
          <div v-if="!dish.isOfficial" class="q-pt-md">
            <q-scroll-area
                :thumb-style="thumbStyle"
                :content-style="contentStyle"
                :content-active-style="contentActiveStyle"
                :visible="true"
                class="full-width" style="height: 40px;">
              <q-tabs
                  v-model="taste"
                  class="text-teal-6"
                  indicator-color="transparent"
                  active-class="text-white bg-teal-6"
                  dense
                  inline-label
              >
                <q-tab :name="dish.uuid" label="原味" :ripple="false"/>
                <q-tab v-for="(steps,index) in customStepsArray" :key="index" :name="customUUIDs[index]"
                       :label="`口味`+(index+1)" :ripple="false"/>
              </q-tabs>
            </q-scroll-area>
          </div>
        </q-card-section>
        <q-card-section>
          <div v-if="!dish.isOfficial" class="row q-gutter-sm">
            <q-btn color="teal-6" class="col-3 text-subtitle2" push rounded label="大厨编辑"
                   v-close-popup @click="openDishEditPage"/>
            <q-btn color="teal-6" class="col-5 text-subtitle1" push rounded label="开始炒制"
                   v-close-popup @click="openRunningControlPage"/>
            <q-btn color="teal-6" class="col-3 text-subtitle2" push rounded label="口味调整"
                   @click="openTasteCustomizationPage"/>
          </div>
          <div v-else class="row q-gutter-sm">
            <q-btn color="teal-6" class="col-10 text-subtitle1" push rounded label="开始炒制"
                   v-close-popup @click="openRunningControlPage"/>
            <q-btn color="teal-6" class="col-1" flat icon="add_circle_outline" size="17px" @click="addToPersonals"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <TheTasteCustomization ref="theTasteCustomization"
                           :dish-name="dish.name"
                           :seasoning-map="seasoningMap"
                           :custom-steps-map="uuidToSteps"
                           :customUUIDs="customUUIDs"
                           @update:selectedCustomUUID="(val)=>taste=val"
                           :custom-steps-array="customStepsArray"
                           @add="onAddCustomSteps"
                           @delete="onDeleteCustomSteps"
                           @save="onSaveCustomSteps"
                           @cancel="onEditCustomStepsCancel"/>

    <!--只在windows的electron上显示-->
    <TheDishImageUploader ref="theDishImageUploader" @uploaded="(image)=>dish.image = image"/>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { getCustomDishes, getDish } from "src/api/dish";
import { getSeasonings } from "src/api/seasoning";
import { sum } from "lodash";
import { UseAppStore } from "stores/appStore";
import { useRouter } from "vue-router";
import { UseControllerStore } from "stores/controllerStore";
import { Notify, Platform } from "quasar";
import TheTasteCustomization from "layouts/components/dishDetails/TheTasteCustomization.vue";
import {
  colors,
  thumbStyle,
  contentStyle,
  contentActiveStyle,
  ingredientFormat,
  seasoningFormat,
} from "layouts/components/dishDetails/displayFormat";
import TheDishImageUploader from "layouts/components/dishDetails/TheDishImageUploader.vue";
import { deleteAPI, getAPI, postAPI, putAPI } from "src/api";
import { assign } from "lodash";

const useControllerStore = UseControllerStore();
const useAppStore = UseAppStore();
const router = useRouter();

const dish = ref({});

const ingredientSummary = ref("");
const ingredients = ref([]);

const seasoningMap = {};

const taste = ref(""); // uuid

const customStepsArray = ref([]); // 自定义口味步骤组成的数组
const customUUIDs = ref([]); // 自定义口味步骤的uuid组成的数组
const uuidToSteps = ref({}); // uuid到步骤的映射，包括原味和自定义口味

const onShow = async () => {
  const uuid = useAppStore.dishDetailsCardUUID;
  const seasoningData = await getAPI("seasoning/list");
  seasoningData.data.seasonings.forEach((seasoning) => {
    seasoningMap[seasoning.pump] = seasoning.name;
  });
  const dishData = await getAPI("dish/get", { uuid: uuid });
  dish.value = dishData.data.dish;
  taste.value = dishData.data.dish.uuid;
  uuidToSteps.value[dishData.data.dish.uuid] = dishData.data.dish.steps;

  ingredients.value = ingredientFormat(dishData.data.dish.steps);

  const customStepsList = dishData.data.dish.customStepsList;

  assign(uuidToSteps.value, customStepsList);
  for (let uuid in customStepsList) {
    customStepsArray.value.push(customStepsList[uuid]);
    customUUIDs.value.push(uuid);
  }

  for (let i = 0, len = customStepsArray.value.length; i < len; i++) {
    for (let j = 0; j < customStepsArray.value[i].length; j++) {
      if (["water", "oil"].includes(customStepsArray.value[i][j].instructionType)) {
        Reflect.set(customStepsArray.value[i][j], "editingWeight", customStepsArray.value[i][j].weight);
      } else if (customStepsArray.value[i][j].instructionType === "seasoning") {
        for (let k = 0; k < customStepsArray.value[i][j].seasonings.length; k++) {
          Reflect.set(customStepsArray.value[i][j].seasonings[k], "editingWeight",
              customStepsArray.value[i][j].seasonings[k].weight);
        }
      }
    }
  }
};

const openRunningControlPage = () => {
  useAppStore.setRunningDish(dish.value, taste.value === dish.value.uuid ? "" : taste.value);
  if (useControllerStore.isCooking) {
    Notify.create({
      message: "当前有菜品正在炒制，请稍后",
      type: "warning",
    });
    return;
  }
  useAppStore.showRunningControl();
};

const theTasteCustomization = ref(null);
const openTasteCustomizationPage = () => {
  theTasteCustomization.value.show(taste.value === dish.value.uuid ? customUUIDs.value[0] : taste.value);
};

const openDishEditPage = () => {
  useAppStore.setEditingDish(dish.value);
  useAppStore.setBackBtnShown(true);
  router.push("/dishEdit");
};

const theDishImageUploader = ref(null);
const onImageClick = (uuid) => {
  if (Platform.is.win) {
    theDishImageUploader.value.show(uuid);
  }
};

const onAddCustomSteps = async () => {
  try {
    const { message, data } = await putAPI("dish/add-customSteps", { id: dish.value.id });
    const uuid = data.uuid;
    const customSteps = data.customSteps;

    for (let j = 0; j < customSteps.length; j++) {
      if (["water", "oil"].includes(customSteps[j].instructionType)) {
        Reflect.set(customSteps[j], "editingWeight", customSteps[j].weight);
      } else if (customSteps[j].instructionType === "seasoning") {
        for (let k = 0; k < customSteps[j].seasonings.length; k++) {
          Reflect.set(customSteps[j].seasonings[k], "editingWeight",
              customSteps[j].seasonings[k].weight);
        }
      }
    }
    uuidToSteps.value[uuid] = customSteps;
    customStepsArray.value.push(customSteps);
    customUUIDs.value.push(uuid);
    Notify.create(message);
  } catch (e) {
    console.log(e.toString());
  }

};

const onDeleteCustomSteps = async (uuid) => {
  try {
    const { message } = await deleteAPI("dish/delete-customSteps", {
      id: dish.value.id,
      uuid: uuid,
    });
    const index = customUUIDs.value.indexOf(uuid);
    customUUIDs.value.splice(index, 1);
    customStepsArray.value.splice(index, 1);
    delete uuidToSteps.value[uuid];
    taste.value = dish.value.uuid;
    Notify.create(message);
  } catch (e) {
    console.log(e.toString());
  }
};

const onSaveCustomSteps = async () => {
  try {
    const customStepsList = {};
    for (let i = 0; i < customStepsArray.value.length; i++) {
      for (let j = 0; j < customStepsArray.value[i].length; j++) {
        if (["water", "oil"].includes(customStepsArray.value[i][j].instructionType)) {
          customStepsArray.value[i][j].weight = customStepsArray.value[i][j].editingWeight;
          customStepsArray.value[i][j].instructionName = "添加" +
              seasoningMap[customStepsArray.value[i][j].pumpNumber] +
              customStepsArray.value[i][j].weight + "克";
        } else if (customStepsArray.value[i][j].instructionType === "seasoning") {
          const stepNames = [];
          for (let k = 0; k < customStepsArray.value[i][j].seasonings.length; k++) {
            customStepsArray.value[i][j].seasonings[k].weight = customStepsArray.value[i][j].seasonings[k].editingWeight;
            stepNames.push(seasoningMap[customStepsArray.value[i][j].seasonings[k].pumpNumber] +
                customStepsArray.value[i][j].seasonings[k].weight + "克");
          }
          customStepsArray.value[i][j].instructionName = "添加" + stepNames.join("，");
        }
      }
      customStepsList[customUUIDs.value[i]] = customStepsArray.value[i];
    }
    const { message } = await putAPI("dish/update-customSteps", {
      id: dish.value.id,
      customStepsList: customStepsList,
    });
    Notify.create(message);
  } catch (e) {
    console.log(e.toString());
  }
};

const onEditCustomStepsCancel = () => {
  for (let i = 0; i < customStepsArray.value.length; i++) {
    for (let j = 0, stepLen = customStepsArray.value[i].length; j < stepLen; j++) {
      if (["water", "oil"].includes(customStepsArray.value[i][j].instructionType)) {
        customStepsArray.value[i][j].editingWeight = customStepsArray.value[i][j].weight;
      } else if (customStepsArray.value[i][j].instructionType === "seasoning") {
        for (let k = 0, kLen = customStepsArray.value[i][j].seasonings.length; k < kLen; k++) {
          customStepsArray.value[i][j].seasonings[k].editingWeight = customStepsArray.value[i][j].seasonings[k].weight;
        }
      }
    }
  }
};

const addToPersonals = async () => {
  try {
    const { message } = await postAPI("dish/add-to-personals", {
      id: dish.value.id,
    });
    Notify.create(message);
  } catch (e) {
    console.log(e.toString());
  }
};

const onHide = () => {
  dish.value = {};
  ingredientSummary.value = "";
  customStepsArray.value = [];
  customUUIDs.value = [];
  uuidToSteps.value = {};
};


</script>

<style lang="scss" scoped>
.q-img__content > div {
  padding: 0 0;
}

.q-table thead, .q-table tr, .q-table th, .q-table td {
  border-color: rgba(255, 255, 255, 0.29);
}
</style>
