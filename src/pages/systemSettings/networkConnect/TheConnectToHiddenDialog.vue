<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide" position="top">
      <q-card style="min-width: 350px;margin-top: 100px">
        <q-card-section>
          <div class="text-subtitle1">请输入网络名称与安全密钥</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input ref="ssidInput" color="teal-6" label="网络名称" v-model="ssid" @focus="onFocus('ssid')"
                   @blur="onBlur('ssid')" autofocus/>
          <q-input ref="passwordInput" color="teal-6" label="安全密钥" v-model="password" @focus="onFocus('password')"
                   @blur="onBlur('password')"/>
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

const ssid = ref("");
const password = ref("");
const customKeyboard = ref(null);
const ssidInput = ref(null);
const passwordInput = ref(null);

const show = () => {
  shown.value = true;
};

const onFocus = (name) => {
  customKeyboard.value.setInputName(name);
  if (name === "ssid") {
    customKeyboard.value.setInput(ssid.value);
  } else if (name === "password") {
    customKeyboard.value.setInput(password.value);
  }
};

const onBlur = (name) => {
  if (customKeyboard.value.getInputName() === name) {
    customKeyboard.value.setInputName("default");
  }
};

const onChange = (input, name) => {
  if (name === "ssid") {
    ssid.value = input;
  } else if (name === "password") {
    password.value = input;
  }
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
