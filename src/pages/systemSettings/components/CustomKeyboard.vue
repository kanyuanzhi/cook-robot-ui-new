<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

import { onMounted, onUnmounted } from "vue";

const props = defineProps([""]);
const emit = defineEmits(["keyPress", "change", "clear", "connect"]);

let keyboard = null;
onMounted(() => {
  keyboard = new Keyboard({
    onChange: (input) => onChange(input),
    onKeyPress: (button) => onKeyPress(button),
    preventMouseDownDefault: true,
    layout: {
      default: [
        "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
        "q w e r t y u i o p [ ] \\ {clear}",
        "a s d f g h j k l ; ' {lock}",
        "z x c v b n m , . / {enter}",
      ],
      // shift布局
      shift: [
        "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
        "Q W E R T Y U I O P { } | {clear}",
        "A S D F G H J K L : \" {lock}",
        "Z X C V B N M &lt; &gt; ? {enter}",
      ],
    },
    display: {
      "{bksp}": "connect",
      "{enter}": "connect",
      "{clear}": "clear",
      "{lock}": "cap",
      "{tab}": "tab",
      "{shift}": "shift",
    },
  });
});

const setInputName = (name) => {
  keyboard.setOptions({
    inputName: name,
  });
};

const setInput = (value, name) => {
  keyboard.setInput(value, name);
};


const getInputName = () => {
  return keyboard.options.inputName;
};

const onChange = (input) => {
  emit("change", input, keyboard.options.inputName);
};

const onKeyPress = (button) => {
  emit("keyPress", button);
  if (button === "{enter}") {
    emit("connect");
  }
  if (button === "{clear}") {
    keyboard.clearInput();
    emit("clear");
  }
  if (button === "{shift}" || button === "{lock}") {
    const currentLayout = keyboard.options.layoutName;
    const shiftToggle = currentLayout === "default" ? "shift" : "default";
    keyboard.setOptions({
      layoutName: shiftToggle,
    });
  }
};

onUnmounted(() => {
  keyboard.destroy();
});

defineExpose({
  setInputName,
  setInput,
  getInputName,
});
</script>

<style lang="scss" scoped></style>
