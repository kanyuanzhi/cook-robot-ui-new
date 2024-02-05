<template>
  <q-form
      @submit="onSubmit"
      @reset="onReset"
  >
    <div class="row q-col-gutter-x-lg">
      <ThePumpRatioInput v-for="(seasoning,index) in seasonings" :key="seasoning.uuid"
                         class="col-6" :seasoning="seasoning"
                         :is-warning="useControllerStore.liquidSeasoningWarning[index]"/>
    </div>
    <div class="row  q-mt-lg">
      <div class="col-8">
        <span class="text-teal-8">{{
            $t("systemSettings.pumpSetting.green") + $t("systemSettings.pumpSetting.sufficientText")
          }}
          <span class="text-red-6">{{ $t("systemSettings.pumpSetting.red") }}</span>
          {{ $t("systemSettings.pumpSetting.insufficientText") }}</span>
      </div>
      <div class="col-4 text-right">
        <q-btn :label="$t('common.cancel')" type="reset" text-color="teal-6" push class="q-mr-sm white"/>
        <q-btn :label="$t('common.save')" type="submit" push color="teal-6"/>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { Notify } from "quasar";
import { getSeasoningConfigs, updateSeasoningConfigs } from "src/api/seasoning";
import ThePumpRatioInput from "pages/systemSettings/pumpSetting/ThePumpRatioInput.vue";
import { UseControllerStore } from "stores/controllerStore";
import { getAPI, putAPI } from "src/api";
import { useI18n } from "vue-i18n";

const useControllerStore = UseControllerStore();

const seasonings = ref([]);

onMounted(async () => {
  const { data } = await getAPI("/seasoning/list");
  seasonings.value = data.seasonings;
  for (let i = 0; i < seasonings.value.length; i++) {
    Reflect.set(seasonings.value[i], "editingRatio", seasonings.value[i].ratio);
  }
});

const { t } = useI18n();
const msg = ref(t("common.updateSuccess"));

const onSubmit = async () => {
  try {
    const pumpRatios = [];
    for (let seasoning of seasonings.value) {
      seasoning.ratio = seasoning.editingRatio;
    }
    const { message } = await putAPI("/seasoning/update-pumpRatios", { seasonings: seasonings.value });

    Notify.create(msg.value);
  } catch (e) {
    console.log(e.toString());
  }
};
const onReset = () => {
  for (let seasoning of seasonings.value) {
    seasoning.editingRatio = seasoning.ratio;
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px - 50px - 16px - 1px);
}
</style>
