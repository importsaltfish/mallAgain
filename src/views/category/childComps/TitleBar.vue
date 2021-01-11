<template>
  <div class="title">
    <div>{{titleInfo.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    titleInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  
}
</script>

<style scoped>
.title {
  width: 100px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  border: 1px solid pink;
}

</style>