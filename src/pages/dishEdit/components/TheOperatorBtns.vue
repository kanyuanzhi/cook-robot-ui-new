<template>
  <q-card bordered flat class="my-card" style="">
    <q-card-section class="text-center q-py-sm bg-teal-6 text-white">
      <div class="text-subtitle1">{{ $t("dishEdit.operatorBtns.title") }}</div>
    </q-card-section>
    <q-separator inset/>
    <q-card-section>
      <div class="column justify-between btn-area">
        <div class="col">
          <div class="row justify-around" style="padding-top: 10px">
            <OperatorBtn :label="$t('dishEdit.operatorBtns.ingredient')" size="lg" color="green"
                         icon="fa-solid fa-wheat-awn"
                         @click="theIngredientDialog.show()"/>
            <OperatorBtn :label="$t('dishEdit.operatorBtns.seasoning')" size="lg" color="teal" icon="mdi-shaker"
                         @click="theSeasoningDialog.show()"/>
          </div>
        </div>
        <div class="col">
          <div class="row justify-around" style="padding-top: 10px">
            <OperatorBtn :label="$t('dishEdit.operatorBtns.fire')" size="lg" color="red-7" icon="local_fire_department"
                         @click="theFireDialog.show()"/>
            <OperatorBtn :label="$t('dishEdit.operatorBtns.stirFry')" size="lg" color="brown-5" icon="mdi-pot-mix"
                         @click="theStirFryDialog.show()"/>
          </div>
        </div>
        <div class="col">
          <div class="row justify-around" style="padding-top: 10px">
            <OperatorBtn :label="$t('dishEdit.operatorBtns.water')" size="lg" color="blue" icon="water_drop"
                         @click="theWaterDialog.show()"/>
            <OperatorBtn :label="$t('dishEdit.operatorBtns.oil')" size="lg" color="orange"
                         icon="fa-solid fa-bottle-droplet"
                         @click="theOilDialog.show()"/>
          </div>
        </div>
      </div>

    </q-card-section>
    <q-separator inset/>
    <q-card-actions class="justify-around" style="padding-top: 15px">
      <q-btn-group spread unelevated class="full-width">
        <q-btn color="teal-6" :label="$t('common.save')" @click="theSaveDialog.show()"/>
        <q-separator vertical/>
        <q-btn color="teal-6" :label="$t('common.reset')" @click="useAppStore.resetEditingDish()"/>
        <q-separator vertical/>
        <q-btn color="teal-6" :label="$t('common.clear')" @click="useAppStore.newEditingDish()"/>
        <q-separator vertical/>
        <q-btn color="red-6" :label="$t('common.delete')" @click="deleteDish"/>
      </q-btn-group>
    </q-card-actions>
    <TheIngredientDialog ref="theIngredientDialog" @submit="onSubmit"/>
    <TheSeasoningDialog ref="theSeasoningDialog" @submit="onSubmit"/>
    <TheFireDialog ref="theFireDialog" @submit="onSubmit"/>
    <TheStirFryDialog ref="theStirFryDialog" @submit="onSubmit"/>
    <TheWaterDialog ref="theWaterDialog" @submit="onSubmit"/>
    <TheOilDialog ref="theOilDialog" @submit="onSubmit"/>

    <TheSaveDialog ref="theSaveDialog"/>
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
import { newStirFryStep } from "pages/dishEdit/components/dialogs/newStep";
import { Dialog, Notify } from "quasar";
import { deleteAPI } from "src/api";
import { useI18n } from "vue-i18n";

const useAppStore = UseAppStore();

const { t } = useI18n();

const theIngredientDialog = ref(null);
const theSeasoningDialog = ref(null);
const theFireDialog = ref(null);
const theStirFryDialog = ref(null);
const theWaterDialog = ref(null);
const theOilDialog = ref(null);

const theSaveDialog = ref(null);
const onSubmit = (val, index) => {
  if (index === -1) {
    useAppStore.editingDish.steps.push(val);
  } else {
    useAppStore.editingDish.steps.splice(index + 1, 0, val);
  }
  if (val.instructionType !== "stir_fry" && useAppStore.useEasyStepList) {
    useAppStore.editingDish.steps.push(newStirFryStep(useAppStore.lastStirFryGear, 0));
  }
  useAppStore.shiftEditingDishChangedFlag();
};

const deleteDish = () => {
  Dialog.create({
    message: t("common.deleteConfirmMsg"),
    ok: t("common.confirm"),
    cancel: t("common.cancel"),
    focus: "none",
  }).onOk(async () => {
    try {
      const { message } = await deleteAPI("/dish/delete", { ids: [useAppStore.editingDish.id] });
      useAppStore.newEditingDish();
      Notify.create(message);
    } catch (e) {
      console.log(e.toString());
    }
  });
};
</script>

<style lang="scss" scoped>
.my-card {
  height: calc(100vh - 50px - 32px - 52px);
}

.btn-area {
  //height: 320px;
  height: calc(100vh - 50px - 32px - 52px - 44px - 100px);
}
</style>
