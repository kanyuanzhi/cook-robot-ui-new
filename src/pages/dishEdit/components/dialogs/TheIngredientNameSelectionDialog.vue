<template>
  <q-dialog v-model="shown" @hide="onHide">
    <q-card class="column" style="width: 80%">
      <q-card-section>
        <div class="text-subtitle1">{{ $t("dishEdit.ingredientDialog.nameSelect.title") }}</div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="row q-gutter-md">
        <div v-for="type in ingredientTypes" :key="type.id" class="col">
          <div class="q-pl-md text-weight-bold">{{ formatTypeName(type) }}</div>
          <q-list dense>
            <q-scroll-area style="height: 400px; max-width: 300px;">
              <q-item v-for="(ingredient, index) in ingredients[type.id]" :key="ingredient.id" dense clickable v-ripple
                      @click="onSelect($event, formatIngredientName(ingredient))">
                <q-item-section>{{ index + 1 + ". " + formatIngredientName(ingredient) }}</q-item-section>
              </q-item>
            </q-scroll-area>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { getAPI } from "src/api";
import { UseAppStore } from "stores/appStore";

const emit = defineEmits(["select"]);
const appStore = UseAppStore();

const shown = ref(false);

const ingredients = ref({}); // 食材
const ingredientTypes = ref([]); // 食材类型
const show = async () => {
  shown.value = true;
  try {
    const ingredientTypeData = await getAPI("ingredient-type/list");
    ingredientTypes.value = ingredientTypeData.data.ingredientTypes;
    const ingredientData = await getAPI("ingredient/list");
    ingredientData.data.ingredients.forEach((ingredient) => {
      if (!ingredients.value[ingredient.type]) {
        ingredients.value[ingredient.type] = [];
      }
      ingredients.value[ingredient.type].push(ingredient);
    });
  } catch (e) {
    console.log(e.toString());
  }
};

const formatTypeName = (type) => {
  if (appStore.getLocal() === "cn") {
    return type.name;
  } else if (appStore.getLocal() === "en") {
    return type.nameEn;
  } else if (appStore.getLocal() === "tw") {
    return type.nameTw;
  }
};

const formatIngredientName = (ingredient) => {
  if (appStore.getLocal() === "cn") {
    return ingredient.name;
  } else if (appStore.getLocal() === "en") {
    return ingredient.nameEn;
  } else if (appStore.getLocal() === "tw") {
    return ingredient.nameTw;
  }
};

const onSelect = (e, val) => {
  emit("select", val);
  shown.value = false;
};

const onHide = () => {
  ingredients.value = {};
  ingredientTypes.value = [];
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
@media (min-width: 1000px) {
  .q-dialog__inner--minimized > div {
    max-width: 1000px;
  }
}
</style>
