<template>
  <div>
    <q-dialog v-model="shown" persistent @hide="onHide" position="top">
      <q-card style="width: 400px;margin-top: 100px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">保存菜品</div>
        </q-card-section>
        <q-item dense>
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
        <q-item dense>
          <q-item-section avatar>菜系</q-item-section>
          <q-item-section>
            <q-select
              dense
              options-dense
              filled
              v-model="newCuisine"
              :options="cuisineOptions"
              options-cover
              stack-label
            >
            </q-select>
          </q-item-section>
        </q-item>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">保存</q-btn>
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
      <CustomKeyboard ref="customKeyboard" @change="onChange" @enter="onSubmit"/>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Notify } from "quasar";
import { createDish } from "src/api/dish";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard.vue";
import { getCuisines } from "src/api/cuisine";

const props = defineProps(["dish"]);
const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const newName = ref(props.dish.name);
const cuisineOptions = ref([]);
const cuisineMap = ref({});
const newCuisine = ref({});

onMounted(async () => {
  const { data } = await getCuisines();
  const cuisines = data.data;
  cuisines.forEach(cuisine => {
    cuisineOptions.value.push({
      label: cuisine.name,
      value: cuisine.id,
    });
    cuisineMap.value[cuisine.id] = cuisine.name;
  });
  newCuisine.value = {
    label: cuisineMap.value[props.dish.cuisine],
    value: props.dish.cuisine,
  };
});

let isUpdate = false;
let stepIndex = 0;

const show = (step, index) => {
  shown.value = true;
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
const onSubmit = async () => {
  if (newName.value.trim() === "") {
    Notify.create("请输入菜品名称");
    return;
  }
  const newDish = {
    name: newName.value,
    cuisine: newCuisine.value.value,
    steps: props.dish.steps
  };
  const res = await createDish(newDish);
  // eslint-disable-next-line vue/no-mutating-props
  props.dish.name = newName.value;
  // eslint-disable-next-line vue/no-mutating-props
  props.dish.cuisine = newCuisine.value;
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
