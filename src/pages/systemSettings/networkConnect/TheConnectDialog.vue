<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide" position="top">
      <q-card style="min-width: 350px;margin-top: 100px">
        <q-card-section>
          <div class="text-subtitle1">请输入网络安全密钥</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input color="teal-6" label="安全密钥" v-model="password" autofocus/>
        </q-card-section>

        <q-card-actions align="right" class="text-teal-6">
          <q-btn push label="确认" color="teal-6" v-close-popup @click="emits('connect', ssid, password)"/>
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
        @connect="emits('connect', ssid, password)"
      />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomKeyboard from "pages/systemSettings/components/CustomKeyboard.vue";

const emits = defineEmits(["connect"]);

const shown = ref(false);

const password = ref("");
const ssid = ref("");
const customKeyboard = ref(null);

const show = (ssidValue) => {
  shown.value = true;
  ssid.value = ssidValue;
};

const onChange = (input, name) => {
  password.value = input;
};

const onHide = () => {
  password.value = "";
  ssid.value = "";
  customKeyboard.value = null;
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
