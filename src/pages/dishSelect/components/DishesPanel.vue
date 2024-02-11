<template>
  <q-tab-panel style="padding-bottom: 0;padding-top: 0" :name="cuisineId">
    <div class="cards-wrapper">
      <div class="row q-col-gutter-md">
        <div class="col-4" v-for="dish in dishes" :key="dish.uuid">
          <DishPanelCard :dish-image="dish.image" :dish-name="dish.name"
                         :img-height="imgHeight" :card-section-width="cardSectionWidth"
                         :dish-name-display-count="dishNameDisplayCount"
                         @click="useAppStore.showDishDetailsCard(dish.uuid)"/>
        </div>
      </div>
    </div>

    <div class="flex pagination-wrapper">
      <q-pagination
          v-model="pageCurrent"
          :max="pageMax"
          max-pages="10"
          direction-links
          gutter="10px"
          outline
          color="teal-6"
          active-design="unelevated"
          active-color="teal-6"
          :ellipses="true"
          boundary-numbers
      />
    </div>
  </q-tab-panel>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { ceil } from "lodash";
import DishPanelCard from "pages/dishSelect/components/DishPanelCard.vue";
import { UseAppStore } from "stores/appStore";
import { getAPI } from "src/api";
import { UseSoftwareInfoStore } from "stores/softwareInfoStore";
import { machineModelStyleMap } from "pages/machineModelStyleMap";

const useAppStore = UseAppStore();
const useSoftwareInfoStore = UseSoftwareInfoStore();

const imgHeight = ref(null);
const cardSectionWidth = ref(null);
const dishNameDisplayCount = ref(null);
const pageSize = ref(null);

const props = defineProps(["cuisineId"]);
const dishes = ref([]);
const count = ref(0);
const pageMax = ref(0);
const pageCurrent = ref(1);
// const filter = ref("");

onMounted(async () => {
  await useSoftwareInfoStore.fetch();
  imgHeight.value = machineModelStyleMap[useSoftwareInfoStore.machineModel]["dishPanelCardImageHeight"];
  cardSectionWidth.value = machineModelStyleMap[useSoftwareInfoStore.machineModel]["dishPanelCardSectionWidth"];
  dishNameDisplayCount.value = machineModelStyleMap[useSoftwareInfoStore.machineModel]["dishPanelCardNameDisplayCount"];
  pageSize.value = machineModelStyleMap[useSoftwareInfoStore.machineModel]["dishesPanelPageSize"];

  // await getPaginationData();
  await getDishesData();

  if (useAppStore.isBackFromDishEdit) {
    pageCurrent.value = useAppStore.cuisinePage;
    useAppStore.setIsBackFromDishEdit(false);
  } else {
    pageCurrent.value = 1;
    useAppStore.setCuisinePage(1);
  }
});

watch(pageCurrent,
    async (value) => {
      // await getPaginationData();
      await getDishesData();
      useAppStore.setCuisinePage(pageCurrent.value);
    });

watch(() => useAppStore.searchFilter,
    async (value, oldValue, onCleanup) => {
      await getDishesData();
    });

watch(() => useAppStore.dishSourceTab,
    async (value) => {
      // await getPaginationData();
      await getDishesData();
    });

// const getPaginationData = async () => {
//   const countData = await getAPI("dish/count", {
//     enableCuisineFilter: props.cuisineId !== 0,
//     cuisineFilter: props.cuisineId === 0 ? "" : props.cuisineId,
//     isOfficial: useAppStore.dishSourceTab === "official",
//   });
//
//   count.value = countData.data.count;
//   pageMax.value = ceil(count.value / pageSize.value, 0);
// };

const getDishesData = async () => {
  const { data } = await getAPI("dish/list", {
    pageIndex: pageCurrent.value,
    pageSize: pageSize.value,
    enableCuisineFilter: props.cuisineId !== 0,
    cuisineFilter: props.cuisineId === 0 ? "" : props.cuisineId,
    isOfficial: useAppStore.dishSourceTab === "official",
    filter: useAppStore.searchFilter,
  });
  count.value = data.count;
  pageMax.value = ceil(count.value / pageSize.value, 0);
  dishes.value = data.dishes;
};
</script>

<style lang="scss" scoped>
.cards-wrapper {
  height: calc(100vh - 50px - 32px - 20px - 20px - 10px - 20px)
  //height: 450px
  //height: 650px
}

.pagination-wrapper {
  //height: 20px;
  margin-top: 15px;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
