<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=1500) {
      let timer = null
      if (timer) {clearTimeout(timer)}
      
      this.message = message
      this.isShow = true
      timer = setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: aliceblue;
  background-color: rgba(0, 0, 0, .8);

  z-index: 2;
}
.toast div {
  /* color: black; */
}
</style>