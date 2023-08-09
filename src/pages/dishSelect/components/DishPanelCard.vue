<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal style="width: 100%;">
      <q-img
        class="col-12"
        :src="'data:image/png;base64,' + dishImage"
        height="105px"
        fit="fill"
      />
      <q-card-section  class="my-section">
        <q-card-section style="height: 35px;" class="my-section-inner">
          <div class="text-subtitle2 text-white" style="">
            {{ nameDisplay }}
          </div>
        </q-card-section>
        <!-- <q-separator inset /> -->
<!--        <q-card-section-->
<!--          style="height: 20px; padding-top: 10px; text-align: right"-->
<!--        >-->
<!--          <span class="text-grey-7" style="font-size: 12px">200人做过</span>-->
<!--        </q-card-section>-->
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps(["dishImage", "dishName"]);

const nameDisplay = computed(() => {
  return props.dishName.length > 12
    ? props.dishName.substring(0, 12) + "..."
    : props.dishName;
});
</script>

<style lang="scss" scoped>
.my-section {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding:0;
}

.my-section-inner {
  background-color: rgba(#666, 0.5);
  width: 100%;
  padding: 5px;
}

</style>
