<template>
  <div class="cart-list">
    <scroll :click="true" class="cart-wrapper" ref="scroll">
      <cart-list-item v-for="(item, index) in this.cartList"
      :key="index" 
      :item-info="item"/>
      
    </scroll>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
export default {
  components: { CartListItem, Scroll },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$bus.$on('cartLoad', () => {
      this.$refs.scroll.scroll.refresh()
    })
  }
}
</script>

<style scoped>

.cart-list {
  height: calc(100% - 49px - 44px - 50px);
  overflow: hidden;
}
.cart-wrapper {
  
}
</style>