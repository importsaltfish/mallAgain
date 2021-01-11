<template>
  <nav-bar>
    <div slot="left" @click="backHome" class="left">
      <div class="left-arrow"></div>
    </div>
    <div slot="center" class="center">
      <span
        v-for="(item, index) in titles"
        :key="index"
        @click="themeClick(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ item }}
      </span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  components: { NavBar },
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods: {
    backHome() {
      this.$router.back();
    },
    themeClick(index) {
      this.$emit('themeClick', index)
    }
  },
};
</script>

<style scoped>
.left {
  position: relative;
}
.left-arrow {
  position: absolute;
  top: calc(22px - 15 * 0.7px);
  left: calc(30px - 15 * 0.7px);

  transform: rotate(-45deg);
  width: 15px;
  height: 15px;
  border-top: 2px solid rgb(106, 106, 110);
  border-left: 2px solid rgb(106, 106, 110);
}
.center {
  display: flex;
  justify-content: center;
}
.center span {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>