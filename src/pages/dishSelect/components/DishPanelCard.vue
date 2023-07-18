<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-img
        class="col-6"
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        height="100px"
      />
      <q-card-section style="padding: 0">
        <q-card-section style="height: 60px;width: 120px;padding-top: 10px">
          <div class="text-subtitle2" style="">{{ nameDisplay }}</div>
        </q-card-section>
        <q-separator inset/>
        <q-card-section style="height: 25px; padding-top: 10px; text-align: right">
          <span class="text-grey-7" style="font-size: 12px">200人做过</span>
        </q-card-section>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps(["dishName"]);

const nameDisplay = computed(() => {
  return props.dishName.length > 12 ? props.dishName.substring(0, 12) + "..." : props.dishName;
});
</script>

<style lang="scss" scoped>

</style>
