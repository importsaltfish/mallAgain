<template>
  <div class="pay">
    <div v-for="(item, index) in info" :key="index">{{item}}</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      info: ['待付款', '代收款', '待评价', '退换/售后']
    }
  }
}
</script>

<style scoped>
.pay {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  border-radius: 20px;
  background-color: #fff;
}

</style>