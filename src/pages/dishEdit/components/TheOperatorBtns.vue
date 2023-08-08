<template>
  <q-card bordered flat class="my-card" style="">
    <q-card-section
      class="text-center bg-teal-6 text-white"
      style="height: 30px; padding: 0"
    >
      <div class="text-subtitle1">操作</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section class="control-btns-wrap">
      <div class="row justify-between" style="height: 140px">
        <!-- <div class="col">
          <div class="row justify-around" style="padding-top: 10px">
            <OperatorBtn label="食材" size="lg" color="green" icon="fa-solid fa-wheat-awn"
                         @click="theIngredientDialog.show()"/>
            <OperatorBtn label="调料" size="lg" color="teal" icon="mdi-shaker"
                         @click="theSeasoningDialog.show()"/>
          </div>
        </div>
        <div class="col">
          <div class="row justify-around" style="padding-top: 10px">
            <OperatorBtn label="火力" size="lg" color="red-7" icon="local_fire_department"
                         @click="theFireDialog.show()"/>
            <OperatorBtn label="翻炒" size="lg" color="brown-5" icon="mdi-pot-mix"
                         @click="theStirFryDialog.show()"/>
          </div>
        </div>
        <div class="col">
          <div class="row justify-around" style="padding-top: 10px">
            <OperatorBtn label="纯净水" size="lg" color="blue" icon="water_drop"
                         @click="theWaterDialog.show()"/>
            <OperatorBtn label="食用油" size="lg" color="orange" icon="fa-solid fa-bottle-droplet"
                         @click="theOilDialog.show()"/>
          </div>
        </div> -->
        <OperatorBtn
          label="食材"
          size="md"
          color="green"
          icon="fa-solid fa-wheat-awn"
          @click="theIngredientDialog.show()"
        />
        <OperatorBtn
          label="调料"
          size="md"
          color="teal"
          icon="mdi-shaker"
          @click="theSeasoningDialog.show()"
        />
        <OperatorBtn
          label="火力"
          size="md"
          color="red-7"
          icon="local_fire_department"
          @click="theFireDialog.show()"
        />
        <OperatorBtn
          label="翻炒"
          size="md"
          color="brown-5"
          icon="mdi-pot-mix"
          @click="theStirFryDialog.show()"
        />
        <OperatorBtn
          label="水"
          size="md"
          color="blue"
          icon="water_drop"
          @click="theWaterDialog.show()"
        />
        <OperatorBtn
          label="食用油"
          size="md"
          color="orange"
          icon="fa-solid fa-bottle-droplet"
          @click="theOilDialog.show()"
        />
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions class="justify-around" style="padding: 5px 2px">
      <q-btn-group spread unelevated class="full-width">
        <q-btn color="teal-6" label="保存" @click="theSaveDialog.show()" />
        <q-separator vertical />
        <q-btn
          color="teal-6"
          label="恢复"
          @click="useAppStore.resetEditingDish()"
        />
        <q-separator vertical />
        <q-btn
          color="teal-6"
          label="清空"
          @click="useAppStore.newEditingDish()"
        />
        <q-separator vertical />
        <q-btn color="red-6" label="删除" @click="theDeleteDialog.show()" />
      </q-btn-group>
    </q-card-actions>
    <TheIngredientDialog ref="theIngredientDialog" @submit="onSubmit" />
    <TheSeasoningDialog ref="theSeasoningDialog" @submit="onSubmit" />
    <TheFireDialog ref="theFireDialog" @submit="onSubmit" />
    <TheStirFryDialog ref="theStirFryDialog" @submit="onSubmit" />
    <TheWaterDialog ref="theWaterDialog" @submit="onSubmit" />
    <TheOilDialog ref="theOilDialog" @submit="onSubmit" />

    <TheSaveDialog ref="theSaveDialog" />
    <TheDeleteDialog ref="theDeleteDialog" />
  </q-card>
</template>

<script setup>
import TheOilDialog from "pages/dishEdit/components/dialogs/TheOilDialog.vue";
import TheIngredientDialog from "pages/dishEdit/components/dialogs/TheIngredientDialog.vue";
import TheStirFryDialog from "pages/dishEdit/components/dialogs/TheStirFryDialog.vue";
import TheSeasoningDialog from "pages/dishEdit/components/dialogs/TheSeasoningDialog.vue";
import TheFireDialog from "pages/dishEdit/components/dialogs/TheFireDialog.vue";
import TheWaterDialog from "pages/dishEdit/components/dialogs/TheWaterDialog.vue";
import { ref } from "vue";
import TheSaveDialog from "pages/dishEdit/components/dialogs/TheSaveDialog.vue";
import OperatorBtn from "pages/dishEdit/components/dialogs/OperatorBtn.vue";
import { UseAppStore } from "stores/appStore";
import TheDeleteDialog from "pages/dishEdit/components/dialogs/TheDeleteDialog.vue";
import { newStirFryStep } from "pages/dishEdit/components/dialogs/newStep";

const useAppStore = UseAppStore();

const theIngredientDialog = ref(null);
const theSeasoningDialog = ref(null);
const theFireDialog = ref(null);
const theStirFryDialog = ref(null);
const theWaterDialog = ref(null);
const theOilDialog = ref(null);

const theSaveDialog = ref(null);
const theDeleteDialog = ref(null);
const onSubmit = (val, index) => {
  if (index === -1) {
    useAppStore.editingDish.steps.push(val);
  } else {
    useAppStore.editingDish.steps.splice(index + 1, 0, val);
  }
  if (val.instructionType !== "stir_fry" && useAppStore.useEasyStepList) {
    useAppStore.editingDish.steps.push(
      newStirFryStep(useAppStore.lastStirFryGear, 0)
    );
  }
  useAppStore.shiftEditingDishChangedFlag();
};
</script>

<style lang="scss" scoped>
.my-card {
  // height: calc(100vh - 50px - 32px - 52px);
}

.text-subtitle {
  font-size: 12px;
}

.control-btns-wrap {
  padding: 2px;
  height: 85px;
}
</style>
