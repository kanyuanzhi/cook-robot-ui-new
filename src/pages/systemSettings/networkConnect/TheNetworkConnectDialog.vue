<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide" position="top">
      <q-card style="min-width: 350px;margin-top: 100px">
        <q-card-section>
          <div class="text-subtitle1">请输入网络安全密钥</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="teal-6" dense v-model="password" autofocus/>
        </q-card-section>

        <q-card-actions align="right" class="text-teal-6">
          <q-btn flat label="确认" v-close-popup @click="onConfirm"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="shown"
      no-focus
      no-refocus
      seamless
      full-width
      position="bottom"
    >
      <CustomKeyboard
        ref="customKeyboard"
        @change="onChange"
        @connect="onConfirm"
      />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomKeyboard from "pages/systemSettings/components/CustomKeyboard.vue";
import { Notify } from "quasar";

const shown = ref(false);

const password = ref("");
const network = ref(null);

const customKeyboard = ref(null);

const show = (networkValue) => {
  shown.value = true;
  network.value = networkValue;
};

const onChange = (input, name) => {
  password.value = input;
};

const onConfirm = async () => {
  const result = await window.wlanAPI.connect(network.value.ssid, password.value);
  if (result === null) {
    Notify.create("网络安全密钥错误，请重新输入");
    return;
  }
  shown.value = false;
};

const onHide = () => {
  password.value = ""
  network.value = null
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
