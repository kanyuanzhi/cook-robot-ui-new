<template>
  <q-page>
    <div class="q-pa-sm">
      <q-splitter
          v-model="splitterModel"
      >
        <template v-slot:before>
          <q-tabs
              v-model="useAppStore.cuisineTab"
              vertical
              class="text-teal-6"
              active-bg-color="teal-6"
              active-color="white"
              switch-indicator>
            <q-tab :name="0" :label="$t('dishSelect.base.allDish')" :ripple="false" :class="cuisineTabClass"
                   style="border-top-right-radius: 20px;border-bottom-right-radius: 20px;"/>
            <q-tab v-for="cuisine in cuisines" :key="cuisine.id" :name="cuisine.id" :label="formatCuisineName(cuisine)"
                   :ripple="false" :class="cuisineTabClass"
                   style="border-top-right-radius: 20px;border-bottom-right-radius: 20px;"/>
            <q-separator/>
            <!--            <q-route-tab label="菜品制作" to="/dishEdit"/>-->
          </q-tabs>
          <q-tabs
              v-model="useAppStore.dishSourceTab"
              class="text-teal-6"
              active-bg-color="teal-6"
              active-color="white">
            <q-tab name="official" :label="$t('dishSelect.base.officialDish')" :ripple="false"
                   :class="dishSourceTabClass"
            />
            <q-tab name="personal" :label="$t('dishSelect.base.personalDish')" :ripple="false"
                   :class="dishSourceTabClass"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
              v-model="useAppStore.cuisineTab"
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up">
            <DishesPanel :cuisine-id="0" :name="0"/>
            <DishesPanel v-for="cuisine in cuisines" :key="cuisine.id" :cuisine-id="cuisine.id"
                         :name="cuisine.id"/>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import DishesPanel from "pages/dishSelect/components/DishesPanel.vue";
import { UseAppStore } from "stores/appStore";
import { getAPI } from "src/api";
import { UseSoftwareInfoStore } from "stores/softwareInfoStore";
import { machineModelStyleMap } from "pages/machineModelStyleMap";
import { useI18n } from "vue-i18n";

const useAppStore = UseAppStore();
const { t } = useI18n();

useAppStore.setPageTitle(t("dishSelect.base.title"));
const useSoftwareInfoStore = UseSoftwareInfoStore();

const splitterModel = ref(20);
const cuisines = ref([]);
const cuisineTab = ref(null);

const cuisineTabClass = ref(null);
const dishSourceTabClass = ref(null);

onMounted(async () => {
  await useSoftwareInfoStore.fetch();
  cuisineTabClass.value = machineModelStyleMap[useSoftwareInfoStore.machineModel]["cuisineTabClass"];
  dishSourceTabClass.value = machineModelStyleMap[useSoftwareInfoStore.machineModel]["dishSourceTabClass"];

  const { data } = await getAPI("/cuisine/list");
  cuisines.value = data.cuisines;
});

watch(cuisineTab, () => {
  useAppStore.setCuisineTab(cuisineTab.value);
});

const formatCuisineName = (cuisine) => {
  if (useAppStore.getLocal() === "cn") {
    return cuisine.name;
  } else if (useAppStore.getLocal() === "en") {
    return cuisine.nameEn;
  } else if (useAppStore.getLocal() === "tw") {
    return cuisine.nameTw;
  }
};

</script>

<style lang="scss" scoped>
.cuisine-tab-202308 {
  min-height: 35px;
  height: 43.5px;

  :deep(.q-tab__label) {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 10px;
    padding-top: 0px;
    padding-bottom: 0;
  }
}

.cuisine-tab-202401 {
  min-height: 35px;
  height: 61.5px;

  :deep(.q-tab__label) {
    font-weight: 600;
    font-size: 23px;
    letter-spacing: 10px;
    padding-top: 0px;
    padding-bottom: 0;
  }
}

.dish-source-tab-202308 {
  min-height: 35px;
  height: 43.5px;

  :deep(.q-tab__label) {
    font-weight: 600;
    font-size: 15px;
  }
}

.dish-source-tab-202401 {
  min-height: 35px;
  height: 62px;

  :deep(.q-tab__label) {
    font-weight: 600;
    font-size: 18px;
  }
}
</style>
