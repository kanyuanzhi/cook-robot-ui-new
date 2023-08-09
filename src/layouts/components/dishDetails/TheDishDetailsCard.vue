<template>
  <div>
    <q-dialog v-model="useAppStore.dishDetailsCardShown" @show="onShow" @hide="onHide">
      <q-card style="width: 600px">
        <q-card-section class="bg-teal-6 text-white q-pa-sm">
          <div class="text-subtitle1 text-weight-bold text-center">{{ dish.name }}</div>
        </q-card-section>
        <q-card-section class="text-grey-8">
          <div class="col">
            <div class="col-6">
              <q-img
                v-if="dish.image!==undefined"
                :src="'data:image/png;base64,'+dish.image"
                fit="fill"
                :ratio="4/3"
              />
              <p class="q-px-sm q-pt-sm">
                <span> {{ ingredientSummary }}</span>
              </p>
            </div>
            <div class="col-6">
              <q-list>
                <q-item tag="label" v-ripple class="list-label">
                  <q-item-section avatar>
                    <q-radio v-model="taste" :val="originalTaste.dish.uuid" :color="originalTaste.color"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ originalTaste.label }}</q-item-label>
                    <q-item-label caption>{{ originalTaste.summary }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-scroll-area :thumb-style="thumbStyle" style="height: 240px;">
                  <q-item v-for="customTaste in customTastes" tag="label" :key="customTaste.dish.uuid" v-ripple class="list-label">
                    <q-item-section avatar>
                      <q-radio v-model="taste" :val="customTaste.dish.uuid" :color="customTaste.color"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ customTaste.label }}</q-item-label>
                      <q-item-label caption>{{ customTaste.summary }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-scroll-area>
              </q-list>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="bg-white text-teal-6 q-pa-none">
          <q-btn-group spread square unelevated class="full-width">
            <!-- <q-btn color="teal-6" class="text-weight-bold text-subtitle1" label="大厨编辑" style="padding: 8px 8px"
                   v-close-popup @click="openDishEditPage"/>
            <q-separator vertical/> -->
            <q-btn color="teal-6" class="text-subtitle1" label="口味调整" style="padding: 8px 8px" size="md"
                   @click="openTasteCustomizationPage"/>
            <q-separator vertical/>
            <q-btn color="teal-6" class="text-subtitle1" label="开始炒制" style="padding: 8px 8px" size="md"
                   v-close-popup @click="openRunningControlPage"/>
          </q-btn-group>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <TheTasteCustomization ref="theTasteCustomization" :dish-name="dish.name" :seasoning-map="seasoningMap"/>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getCustomDishes, getDish } from "src/api/dish";
import { getSeasonings } from "src/api/seasoning";
import { sum } from "lodash";
import { UseAppStore } from "stores/appStore";
import { useRouter } from "vue-router";
import { UseControllerStore } from "stores/controllerStore";
import { Notify } from "quasar";
import TheTasteCustomization from "layouts/components/dishDetails/TheTasteCustomization.vue";
import { ingredientFormat, seasoningFormat } from "layouts/components/dishDetails/displayFormat";

const useControllerStore = UseControllerStore();
const useAppStore = UseAppStore();
const router = useRouter();

const dish = ref({});

const ingredientSummary = ref("");

const seasoningMap = ref(null);

const taste = ref("");

const originalTaste = ref({
  label: "原味",
  color: "teal-6",
  summary: "",
  dish: {},
});

const customTastes = ref([
  {
    label: "口味1",
    color: "blue",
    summary: "",
    dish: {},
  },
  {
    label: "口味2",
    color: "red",
    summary: "",
    dish: {},
  },
  {
    label: "口味3",
    color: "orange",
    summary: "",
    dish: {},
  }
]);

const uuidToTaste = {};

const onShow = async () => {
  const uuid = useAppStore.dishDetailsCardUUID;
  const seasoningData = await getSeasonings();
  seasoningMap.value = seasoningData.data.data;

  const dishData = await getDish(uuid);
  dish.value = dishData.data.data;
  originalTaste.value["dish"] = dishData.data.data;
  originalTaste.value["summary"] = seasoningFormat(dishData.data.data.steps, seasoningMap.value);
  taste.value = dishData.data.data.uuid;
  uuidToTaste[dishData.data.data.uuid] = taste;

  ingredientSummary.value = ingredientFormat(dishData.data.data.steps);

  const customDishesData = await getCustomDishes(uuid);
  const customDishes = customDishesData.data.data;
  for (let i = 0, len = customDishes.length; i < len; i++) {
    for (let j = 0; j < customDishes[i].steps.length; j++) {
      if (["water", "oil"].includes(customDishes[i].steps[j].instructionType)) {
        Reflect.set(customDishes[i].steps[j], "editingWeight", customDishes[i].steps[j].weight);
      } else if (customDishes[i].steps[j].instructionType === "seasoning") {
        for (let k = 0; k < customDishes[i].steps[j].seasonings.length; k++) {
          Reflect.set(customDishes[i].steps[j].seasonings[k], "editingWeight", customDishes[i].steps[j].seasonings[k].weight);
        }
      }
    }
    customTastes.value[i]["dish"] = customDishes[i];
    customTastes.value[i]["summary"] = seasoningFormat(customDishes[i].steps, seasoningMap.value);
    uuidToTaste[customDishes[i].uuid] = customTastes.value[i];
  }
};

const openRunningControlPage = () => {
  if (taste.value !== originalTaste.value.dish.uuid) {
    dish.value = uuidToTaste[taste.value].dish;
  }
  if (useControllerStore.isCooking) {
    Notify.create("当前有菜品正在炒制，请稍后");
  } else {
    useAppStore.setRunningDish(dish.value);
  }
  router.push("/control")
  // useAppStore.showRunningControl();
};

const theTasteCustomization = ref(null);

const openTasteCustomizationPage = () => {
  if (taste.value === originalTaste.value.dish.uuid) {
    theTasteCustomization.value.show(customTastes.value[0].dish.uuid, customTastes.value);
    return;
  }
  theTasteCustomization.value.show(taste.value, customTastes.value);
};

const openDishEditPage = () => {
  useAppStore.setEditingDish(dish.value);
  router.push("/dishEdit");
};

const onHide = () => {
  dish.value = {};
  ingredientSummary.value = "";
  originalTaste.value = {
    label: "原味",
    color: "teal-6",
    summary: "",
    dish: {},
  };
  customTastes.value = [
    {
      label: "口味1",
      color: "blue",
      summary: "",
      dish: {},
    },
    {
      label: "口味2",
      color: "red",
      summary: "",
      dish: {},
    },
    {
      label: "口味3",
      color: "orange",
      summary: "",
      dish: {},
    }
  ];
};

const thumbStyle = {
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#009688",
  width: "5px",
  opacity: "0.75"
};
</script>

<style lang="scss" scoped>
.list-label {
  padding-left: 0;
  padding-right: 0;
}
</style>