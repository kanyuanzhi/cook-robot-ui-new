<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-img
          class="col-6"
          :src="dishImage"
          :height="imgHeight"
          fit="fill"
      />
      <div style="padding: 0">
        <q-card-section style="height: 60px;padding-top: 10px" :style="{width: cardSectionWidth}">
          <div class="text-subtitle2 text-grey-8" style="">{{ nameDisplay }}</div>
        </q-card-section>
        <q-separator inset/>
        <q-card-section style="height: 20px; padding-top: 10px; text-align: right">
          <!--          <span class="text-grey-7" style="font-size: 12px">200人做过</span>-->
        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["dishImage", "dishName", "imgHeight", "cardSectionWidth", "dishNameDisplayCount"]);

const nameDisplay = computed(() => {
  return props.dishName.length > props.dishNameDisplayCount ? props.dishName.substring(0, props.dishNameDisplayCount) +
      "..." : props.dishName;
});
</script>

<style lang="scss" scoped>

</style>
