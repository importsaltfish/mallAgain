<template>
  <div class="bottom-bar">
    <div class="check-content" @click="buttonClcik">
      <check-button :is-checked="isSelectAll" />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

import { mapGetters } from "vuex";
export default {
  components: { CheckButton },
  methods: {
    buttonClcik() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
        return;
      } else {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.cartList.find((item) => item.checked)) {
        this.$toast.show("未选择要购买的商品");
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      }
      return !this.cartList.find((item) => item.checked === false);
    },
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((prevalue, item) => prevalue + item.price * item.count, 0)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.check-content {
  padding-left: 1em;
  display: flex;
  align-items: center;
}
.check-content span {
  margin-left: 0.5em;
}
/* .check-button {
  display: inline-block;
} */
.price {
  margin-left: 1em;
  flex: 1;
}
.calculate {
  text-align: center;
  width: 100px;
  background-color: pink;
}
</style>