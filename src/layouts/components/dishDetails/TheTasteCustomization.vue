<template>
  <q-dialog v-model="shown" transition-show="scale" transition-hide="scale" persistent>
    <q-card style="width: 400px">
      <q-card-section>
        <div class="bg-teal-6 q-py-sm text-center" style="border-radius: 10px;">
          <span class="text-subtitle1 text-weight-bold text-white">{{ dishName }}口味调整（单位：克）</span>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-tab-panels v-model="customUUID">
          <TheTasteModificationPanel v-for="(steps, index) in customStepsArray" :key="customUUIDs[index]"
                                     :steps="steps" :name="customUUIDs[index]"
                                     :seasoning-map="seasoningMap"/>
        </q-tab-panels>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :content-style="contentStyle"
            :content-active-style="contentActiveStyle"
            class="full-width" style="height: 40px;">
          <q-tabs
              v-model="customUUID"
              @update:model-value="val=>emit('update:selectedCustomUUID', val)"
              class="text-teal-6"
              active-bg-color="teal-6"
              active-color="white"
              indicator-color="transparent"
              dense
          >
            <q-tab v-for="(steps, index) in customStepsArray" :key="customUUIDs[index]" :name="customUUIDs[index]"
                   :label="'口味'+(index+1)" :ripple="false"/>
          </q-tabs>
        </q-scroll-area>
      </q-card-section>
      <q-card-section class="bg-white text-teal-6">
        <div class="row q-gutter-sm">
          <q-btn color="teal-6" class="col text-subtitle2" label="删除" :disable="customUUID===undefined" rounded push
                 @click="deleteCustomSteps"/>
          <q-btn color="teal-6" class="col text-subtitle2" label="新建" rounded push @click="addCustomSteps"/>
          <q-btn color="teal-6" class="col text-subtitle2" label="取消" rounded push v-close-popup @click="cancel"/>
          <q-btn color="teal-6" class="col text-subtitle2" label="保存" rounded push v-close-popup @click="save"/>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import TheTasteModificationPanel from "layouts/components/dishDetails/TheTasteModificationPanel.vue";
import { thumbStyle, contentStyle, contentActiveStyle } from "layouts/components/dishDetails/displayFormat";

const props = defineProps(["dishName", "seasoningMap", "customUUIDs", "customStepsArray"]);
const emit = defineEmits(["add", "delete", "cancel", "save", "update:selectedCustomUUID"]);

const shown = ref(false);
const customUUID = ref("");

const show = (selectedCustomUUID) => {
  shown.value = true;
  customUUID.value = selectedCustomUUID;
};

const addCustomSteps = () => {
  emit("add");
};

const deleteCustomSteps = async () => {
  emit("delete", customUUID.value);
};

const cancel = () => {
  emit("cancel");
};

const save = async () => {
  emit("save");
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
//@media (min-width: 600px){
//  .q-dialog__inner--minimized > div {
//    max-width: 600px;
//  }
//}
</style>
