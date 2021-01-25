<template>
  <div class="collection">
    
      <div v-for="(item, index) in info" :key="index">{{ item }}</div>
    
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      info: ["商品收藏", "店铺关注", "喜欢的内容", "浏览记录"],
    };
  },
};
</script>

<style scoped>
.collection {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5px;
  height: 70px;
  background-color: #fff;
  border-radius: 20px;
  /* background-color: skyblue; */
}

</style>