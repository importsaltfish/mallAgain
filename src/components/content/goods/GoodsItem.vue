<template>
  <div class="per-item" @click="goodsClick">
    <img class="goods-image" v-lazy="showImages" alt="" @load="imageLoad" />
    <p class="title">{{ goodsInfo.title }}</p>
    <span class="price">{{ goodsInfo.price }}</span>
    <span class="collect">{{ goodsInfo.cfav }}</span>
  </div>
</template>

<script>
export default {
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      if (this.$route.path.indexOf("/home") !== -1) {
        this.$bus.$emit("goodsImageLoad");
      } else if (this.$route.path.indexOf("/detail") !== -1) {
        this.$bus.$emit("detailImagesLoad");
      }
    },
    goodsClick() {
      this.$router.push("/detail/" + this.goodsInfo.iid);
    },
  },
  computed: {
    showImages() {
      return this.goodsInfo.image || this.goodsInfo.show.img;
    },
  },
};
</script>

<style scoped>
.per-item {
  display: inline-block;
  width: 48%;
  text-align: center;
  /* margin-left: 1.5%; */
  font-size: 12px;
  margin-bottom: 5px;
}
.goods-image {
  width: 100%;
  border-radius: 5px;
}
.title {
  margin-top: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.price {
  color: var(--color-high-text);
}
.collect {
  position: relative;
  margin-left: 19px;
}
.collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0px 0/14px 14px no-repeat;
}
.white {
  content: "";
  width: 100%;
  height: 49px;
  background-color: pink;
}
</style>