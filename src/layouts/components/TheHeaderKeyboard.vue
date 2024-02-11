<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/chinese";
import { onMounted, onUnmounted, ref } from "vue";
import { UseAppStore } from "stores/appStore";

const useAppStore = UseAppStore();

const emit = defineEmits(["keyPress", "change", "clear", "enter"]);
const props = defineProps(["default"]);

const number = [
  "7 8 9",
  "4 5 6",
  "1 2 3",
  "{bksp} 0 {enter}"];

layout.layout.number = number;

let keyboard = null;
onMounted(() => {
  keyboard = new Keyboard({
    onChange: (input) => onChange(input),
    onKeyPress: (button) => onKeyPress(button),
    preventMouseDownDefault: true,
    ...layout,
    display: {
      "{bksp}": "del",
      "{enter}": "enter",
      "{clear}": "clear",
      "{lock}": "caps",
      "{tab}": "tab",
      "{shift}": "shift",
      "{space}": "space",
    },
  });
  if (props.default) {
    try {
      keyboard.setOptions({
        layoutName: props.default
      });
    }catch (e) {
      console.error( "layoutName wrong")
      keyboard.setOptions({
        layoutName: "default"
      });
    }
  }
});

function setInputName(name) {
  keyboard.setOptions({
    inputName: name,
  });
}

function setInput(value, name) {
  keyboard.setInput(value, name);
}

function onChange(input) {
  emit("change", input, keyboard.options.inputName);
}

function onKeyPress(button) {
  emit("keyPress", button);
  if (button === "{enter}") {
    emit("enter");
  }
  if (button === "{clear}") {
    keyboard.clearInput();
    emit("clear");
  }
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}

onUnmounted(() => {
  keyboard.destroy();
});

defineExpose({
  setInputName,
  setInput,
});
</script>

<style lang="scss" scoped></style>
