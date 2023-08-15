<template>
  <q-page class="flex flex-center">
    <div class="row q-pa-md full-width">
      <div class="col-5 q-pr-md">
        <div class="column justify-start click-area select-area q-pa-xl" @click="router.push('/dishSelect')">
          <div class="col-2">
            <span class="text-blue-8 text-weight-bold text-h4">菜品选择</span>
          </div>
          <div class="col-2">
            <span class="text-grey-9 text-weight-bold text-h6">多种菜品任你选择</span>
          </div>
        </div>
      </div>
      <div class="col-7 column q-gutter-y-md">
        <div class="col column q-pa-xl click-area interact-area">
          <div class="col-6">
            <span class="text-amber-8 text-weight-bold text-h4">人机互动</span>
          </div>
          <div class="col-6">
            <span class="text-grey-9 text-weight-bold text-h6">多种互动任你选择</span>
          </div>
        </div>
        <div class="col column q-pa-xl click-area shop-area">
          <div class="col-6">
            <span class="text-orange-10 text-weight-bold text-h4">商城选购</span>
          </div>
          <div class="col-6">
            <span class="text-grey-9 text-weight-bold text-h6">多种商品任你选择</span>
          </div>
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
import { UseAppStore } from "stores/appStore";

const router = useRouter();

const useAppStore = UseAppStore()
useAppStore.setPageTitle("主页")
</script>

<style lang="scss" scoped>
.select-area {
  height: calc(100vh - 50px - 50px - 40px);
}

.click-area {
  border-radius: 10px;
  background-size: cover; /* 背景图片按比例缩放，保持完全覆盖 */
  background-position: center; /* 将背景图片定位到中心 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  &.select-area {
    background-image: url('src/assets/bg3.png'); /* 设置背景图片路径 */
  }

  &.interact-area {
    background-image: url('src/assets/bg2.png'); /* 设置背景图片路径 */
  }

  &.shop-area {
    background-image: url('src/assets/bg1.png'); /* 设置背景图片路径 */
  }

}
</style>
