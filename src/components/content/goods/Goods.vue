// 这里其实没有必要
<template>
  <div class="goods">
    <goods-item class="goods-item" 
    v-for="(item, index) in goodsList" :key="index"
    :goods-info="item"
    />
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue'
export default {
  components: { GoodsItem },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: space-evenly;
}
.white {
  height: 49px;
}

</style>