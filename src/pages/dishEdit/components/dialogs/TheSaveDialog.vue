<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide" position="top">
      <q-card style="width: 400px;margin-top: 50px" class="q-mt-md">
        <q-card-section class="bg-teal-6 text-white q-py-sm">
          <div class="text-h6">保存菜品</div>
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section avatar>名称</q-item-section>
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
            <q-item-section avatar>菜系</q-item-section>
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
              保存操作将会重置该菜品已有的三种自定义口味
            </span>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn unelevated size="md" color="teal-6" @click="onSubmit('save')">保存</q-btn>
          <q-btn unelevated color="teal-6" @click="onSubmit('create')">新建</q-btn>
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

const useAppStore = UseAppStore();

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
      label: cuisine.name,
      value: cuisine.id,
    });
    cuisineMap.value[cuisine.id] = cuisine.name;
  });
  cuisine.value = {
    label: cuisineMap.value[useAppStore.editingDish.cuisine],
    value: useAppStore.editingDish.cuisine,
  };
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
    Notify.create("请输入菜品名称");
    return;
  }
  const newDish = {
    id: useAppStore.editingDish.id,
    name: newName.value,
    cuisine: cuisine.value.value,
    steps: useAppStore.editingDish.steps,
    uuid: useAppStore.editingDish.uuid,
  };
  if (useAppStore.editingDish.uuid === "" || flag === "create") {
    try {
      const { data, message } = await postAPI("dish/add", newDish);
      useAppStore.editingDish.id = data.dish.id;
      useAppStore.editingDish.name = data.dish.name;
      useAppStore.editingDish.cuisine = data.dish.cuisine;
      useAppStore.editingDish.uuid = data.dish.uuid;
      useAppStore.originEditingDish = cloneDeep(useAppStore.editingDish);
      Notify.create(message);
    } catch (e) {
      Notify.create({
        message: e.toString(),
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
      Notify.create(message);
    } catch (e) {
      Notify.create({
        message: e.toString(),
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
