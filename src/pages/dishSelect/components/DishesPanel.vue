<template>
  <q-tab-panel style="padding-bottom: 0;padding-top: 0" :name="cuisineId">
    <div class="cards-wrapper">
      <div class="row q-col-gutter-md">
        <div class="col-4" v-for="dish in dishes" :key="dish.uuid">
          <DishPanelCard :dish-image="dish.image" :dish-name="dish.name"
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
import { onMounted, ref, watch } from "vue";
import { getAllDishes, getDishes } from "src/api/dish";
import { ceil } from "lodash";
import DishPanelCard from "pages/dishSelect/components/DishPanelCard.vue";
import { UseAppStore } from "stores/appStore";

const useAppStore = UseAppStore();

const pageSize = 12;

const props = defineProps(["cuisineId"]);
const dishes = ref([]);
const count = ref(0);
const pageMax = ref(0);
const pageCurrent = ref(1);

onMounted(async () => {
  let responseData;
  if (props.cuisineId === 0) {
    responseData = await getAllDishes(1, pageSize, props.cuisineId);
  } else {
    responseData = await getDishes(1, pageSize, props.cuisineId);
  }
  count.value = responseData.data.data.count;
  pageMax.value = ceil(count.value / pageSize);

  if (useAppStore.isBackFromDishEdit) {
    pageCurrent.value = useAppStore.cuisinePage;
    useAppStore.setIsBackFromDishEdit(false);
  } else {
    pageCurrent.value = 1;
    useAppStore.setCuisinePage(1)
  }

  if (props.cuisineId === 0) {
    responseData = await getAllDishes(pageCurrent.value, pageSize, props.cuisineId);
  } else {
    responseData = await getDishes(pageCurrent.value, pageSize, props.cuisineId);
  }
  dishes.value = responseData.data.data.dishes;

  watch(pageCurrent,
    async (value) => {
      if (props.cuisineId === 0) {
        responseData = await getAllDishes(pageCurrent.value, pageSize, props.cuisineId);
      } else {
        responseData = await getDishes(pageCurrent.value, pageSize, props.cuisineId);
      }
      dishes.value = responseData.data.data.dishes;
      useAppStore.setCuisinePage(pageCurrent.value);
    });
});
</script>

<style lang="scss" scoped>
.cards-wrapper {
  //height: calc(100vh - 50px - 32px - 20px - 20px - 10px)
  height: 450px
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
