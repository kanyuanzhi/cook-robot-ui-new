<template>
  <q-card bordered flat class="my-card" style="width: 100%">
    <q-card-section
      class="text-center q-py-sm bg-teal-6 text-white"
      style="padding: 0"
    >
      <div class="text-subtitle1">
        步骤{{
          useAppStore.editingDish.name === ""
            ? ""
            : "（" + useAppStore.editingDish.name + "）"
        }}
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <!--      <q-scroll-area class="bg-green-1" style="height: 425px;">-->
      <q-list
        class="scrollable-container"
        ref="stepList"
        bordered
        separator
        style="height: 390px; overflow-y: auto"
      >
        <q-slide-item
          v-for="(step, index) in useAppStore.editingDish.steps"
          :key="step.key"
          class="text-black"
          @right="onDelete(index)"
          right-color="red"
          @click="onStepListItemClick(step, index)"
        >
          <template v-slot:right>
            <div class="flex">
              <q-icon name="delete" />
            </div>
          </template>
          <q-item class="q-px-sm">
            <q-item-section avatar>
              <q-avatar
                rounded
                :color="instructionTypeToColor[step.instructionType]"
                text-color="white"
                :icon="instructionTypeToIcon[step.instructionType]"
                size="md"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{
                index + 1 + ". " + step.instructionName
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon color="teal-6" name="drag_indicator" class="drag-item" />
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </q-card-section>
    <TheIngredientDialog ref="theIngredientDialog" @update="onUpdate" />
    <TheSeasoningDialog ref="theSeasoningDialog" @update="onUpdate" />
    <TheFireDialog ref="theFireDialog" @update="onUpdate" />
    <TheStirFryDialog ref="theStirFryDialog" @update="onUpdate" />
    <TheWaterDialog ref="theWaterDialog" @update="onUpdate" />
    <TheOilDialog ref="theOilDialog" @update="onUpdate" />
  </q-card>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import Sortable from "sortablejs";
import { UseAppStore } from "stores/appStore";
import TheIngredientDialog from "pages/dishEdit/components/dialogs/TheIngredientDialog.vue";
import TheFireDialog from "pages/dishEdit/components/dialogs/TheFireDialog.vue";
import TheStirFryDialog from "pages/dishEdit/components/dialogs/TheStirFryDialog.vue";
import TheWaterDialog from "pages/dishEdit/components/dialogs/TheWaterDialog.vue";
import TheOilDialog from "pages/dishEdit/components/dialogs/TheOilDialog.vue";
import TheSeasoningDialog from "pages/dishEdit/components/dialogs/TheSeasoningDialog.vue";

const useAppStore = UseAppStore();

const stepList = ref(null);

onMounted(() => {
  const sortable = new Sortable(stepList.value.$el, {
    onEnd: onSortEnd,
    // dragClass: "sortable-drag",
    // chosenClass: "sortable-chosen",
    animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
    easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
    handle: ".drag-item", // Specifies which items inside the element should be draggable
  });
  onUnmounted(() => {
    sortable.destroy();
  });
});

const onSortEnd = (event) => {
  const draggedItem = useAppStore.editingDish.steps[event.oldIndex];
  useAppStore.editingDish.steps.splice(event.oldIndex, 1);
  useAppStore.editingDish.steps.splice(event.newIndex, 0, draggedItem);
};

const onDelete = (index) => {
  useAppStore.editingDish.steps.splice(index, 1);
};

// 前端叫step，后端叫instruction
const instructionTypeToColor = {
  ingredient: "green",
  water: "blue",
  oil: "orange",
  heat: "red-7",
  stir_fry: "brown-5",
  seasoning: "teal",
};

const instructionTypeToIcon = {
  ingredient: "fa-solid fa-wheat-awn",
  water: "water_drop",
  oil: "fa-solid fa-bottle-droplet",
  heat: "local_fire_department",
  stir_fry: "mdi-pot-mix",
  seasoning: "mdi-shaker",
};

const theIngredientDialog = ref(null);
const theSeasoningDialog = ref(null);
const theFireDialog = ref(null);
const theStirFryDialog = ref(null);
const theWaterDialog = ref(null);
const theOilDialog = ref(null);

const onStepListItemClick = (step, index) => {
  switch (step.instructionType) {
    case "ingredient":
      theIngredientDialog.value.updateDialogShow(step, index);
      break;
    case "seasoning":
      theSeasoningDialog.value.updateDialogShow(step, index);
      break;
    case "heat":
      theFireDialog.value.updateDialogShow(step, index);
      break;
    case "stir_fry":
      theStirFryDialog.value.updateDialogShow(step, index);
      break;
    case "water":
      theWaterDialog.value.updateDialogShow(step, index);
      break;
    case "oil":
      theOilDialog.value.updateDialogShow(step, index);
      break;
    default:
      return;
  }
};

const onUpdate = (step, index) => {
  useAppStore.editingDish.steps[index] = step;
};
</script>

<style lang="scss" scoped>
.my-card {
  height: calc(100vh - 50px - 32px - 52px);
}

.sortable-drag {
  background: #1976d2;
}

.sortable-chosen {
  background: rgba(38, 166, 154, 0.5);
}

::-webkit-scrollbar {
  width: 3px;
  height: 0;
  background-color: transparent;
  //background-color: #009688;
}

/* 修改滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #009688;
  border-radius: 5px;
}

/* 修改滑轨样式 */
::-webkit-scrollbar-track {
  background-color: #f2f2f2;
}
</style>
