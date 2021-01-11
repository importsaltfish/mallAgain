<template>
  <div class="cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
export default {
  components: { NavBar, CartList, CartBottomBar },
  computed: {
    ...mapGetters(['cartLength'])
  },
  
}
</script>

<style scoped>
.cart {
    height: 100vh;
}
.nav {
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>