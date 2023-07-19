<template>
  <q-page class="flex flex-center">
    <div class="row q-pa-md full-width">
      <div class="col-5 q-pr-md">
        <div class="bg-blue-3 flex flex-center select-area click-area" @click="router.push('/dishSelect')">
          <span class="text-blue-8 text-weight-bold text-h4">菜品选择</span>
        </div>
      </div>
      <div class="col-7 column q-gutter-y-md">
        <div class="col bg-amber-2 flex flex-center click-area">
          <span class="text-amber-8 text-weight-bold text-h4">人机互动</span>
        </div>
        <div class="col bg-pink-2 flex flex-center click-area">
          <span class="text-orange-10 text-weight-bold text-h4">商城选购</span>
        </div>
      </div>
    </div>
    <!--    <img-->
    <!--      alt="Quasar logo"-->
    <!--      src="~assets/quasar-logo-vertical.svg"-->
    <!--      style="width: 200px; height: 200px"-->
    <!--    >-->
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

</script>

<style lang="scss" scoped>
.select-area {
  height: calc(100vh - 50px - 50px - 40px);
}

.click-area {
  border-radius: 10px;
}
</style>
