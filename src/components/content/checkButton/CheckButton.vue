<template>
  <div>
    <div class="check-button" :class="{ checked: isChecked }">
      <img src="~assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
  display: flex;
}
.checked {
  border-color: red;
  background-color: red;
}
.check-button img {
  width: 16px
}
</style>