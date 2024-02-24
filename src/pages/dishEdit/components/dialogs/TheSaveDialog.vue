<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide" position="top">
      <q-card style="width: 400px;margin-top: 50px" class="q-mt-md">
        <q-card-section class="bg-teal-6 text-white q-py-sm">
          <div class="text-h6">{{ $t("dishEdit.saveDishDialog.title") }}</div>
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section avatar>{{ $t("dishEdit.saveDishDialog.dishName") }}</q-item-section>
            <q-item-section>
              <q-input
                  v-model="newName"
                  filled
                  dense
                  autofocus
                  @blur="onInputBlur($event, 'newName')"
                  @focus="onInputFocus($event, 'newName')"
              >
              </q-input>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>{{ $t("dishEdit.saveDishDialog.cuisine") }}</q-item-section>
            <q-item-section>
              <q-select
                  dense
                  filled
                  v-model="cuisine"
                  :options="cuisineOptions"
                  options-cover
                  stack-label
              >
              </q-select>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section avatar></q-item-section>
            <q-item-section>
            <span class="text-grey-7" style="font-size: 12px">
              <span class="text-red">*</span>
              {{ $t("dishEdit.saveDishDialog.note") }}
            </span>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">{{ $t("common.cancel") }}</q-btn>
          <q-btn unelevated size="md" color="teal-6" @click="onSubmit('save')">{{ $t("common.save") }}</q-btn>
          <q-btn unelevated color="teal-6" @click="onSubmit('create')">{{ $t("common.create") }}</q-btn>
        </q-card-actions>

      </q-card>
    </q-dialog>
    <q-dialog
        v-model="shown"
        persistent
        position="bottom"
        no-focus
        no-refocus
        seamless
        full-width
    >
      <CustomKeyboard ref="customKeyboard" @change="onChange"/>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Notify } from "quasar";
import { createDish, updateDish } from "src/api/dish";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard.vue";
import { UseAppStore } from "stores/appStore";
import { cloneDeep } from "lodash/lang";
import { getAPI, postAPI, putAPI } from "src/api";
import { useI18n } from "vue-i18n";

const useAppStore = UseAppStore();
const { t } = useI18n();

const shown = ref(false);

const newName = ref("");
const cuisineOptions = ref([]);
const cuisineMap = ref({});
const cuisine = ref({});

const show = async () => {
  shown.value = true;
  newName.value = useAppStore.editingDish.name;
  cuisineOptions.value = [];
  const { data } = await getAPI("cuisine/list");
  const cuisines = data.cuisines;
  cuisines.forEach(cuisine => {
    cuisineOptions.value.push({
      label: formatCuisineName(cuisine),
      value: cuisine.id,
    });
    cuisineMap.value[cuisine.id] = formatCuisineName(cuisine);
  });
  cuisine.value = {
    label: cuisineMap.value[useAppStore.editingDish.cuisine],
    value: useAppStore.editingDish.cuisine,
  };
};

const formatCuisineName = (cuisine) => {
  if (useAppStore.getLocal() === "cn") {
    return cuisine.name;
  } else if (useAppStore.getLocal() === "en") {
    return cuisine.nameEn;
  } else if (useAppStore.getLocal() === "tw") {
    return cuisine.nameTw;
  }
};

const inputNameToPara = {
  newName,
};

const customKeyboard = ref(null);
const onInputFocus = (e, inputName) => {
  customKeyboard.value.setInputName(inputName);
  customKeyboard.value.setInput(e.target.value, inputName);
};

const onInputBlur = (e, inputName) => {
};

const setDefaultName = (defaultName) => {
  name.value = defaultName;
};

const onChange = (input, inputName) => {
  inputNameToPara[inputName].value = input;
};
const onSubmit = async (flag) => {
  if (newName.value.trim() === "") {
    Notify.create(t("dishEdit.saveDishDialog.emptyNameMsg"));
    return;
  }
  const newDish = {
    id: useAppStore.editingDish.id,
    name: newName.value,
    cuisine: cuisine.value.value,
    steps: useAppStore.editingDish.steps,
    uuid: useAppStore.editingDish.uuid,
    local: useAppStore.getLocal(),
  };
  if (useAppStore.editingDish.uuid === "" || flag === "create") {
    try {
      const { data, message } = await postAPI("dish/add", newDish);
      useAppStore.editingDish.id = data.dish.id;
      useAppStore.editingDish.name = data.dish.name;
      useAppStore.editingDish.cuisine = data.dish.cuisine;
      useAppStore.editingDish.uuid = data.dish.uuid;
      useAppStore.originEditingDish = cloneDeep(useAppStore.editingDish);
      Notify.create(t("common.createSuccess"));
    } catch (e) {
      Notify.create({
        message: t("common.createFailed"),
        type: "negative",
      });
    }
  } else {
    const { data, message } = await putAPI("dish/update-with-steps", newDish);
    try {
      useAppStore.editingDish.name = data.dish.name;
      useAppStore.editingDish.cuisine = data.dish.cuisine;
      useAppStore.originEditingDish.name = data.dish.name;
      useAppStore.originEditingDish.cuisine = data.dish.cuisine;
      Notify.create(t("common.updateSuccess"));
    } catch (e) {
      Notify.create({
        message: t("common.updateFailed"),
        type: "negative",
      });
    }
  }
  shown.value = false;
};

const onHide = () => {
  // newName.value = "";
  // newCuisine.value = {
  //   label: cuisineMap[0],
  //   value: 0
  // };
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
