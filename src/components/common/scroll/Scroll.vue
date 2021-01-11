<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  props: {
    click: {
      type: Boolean,
      default: false,
    },
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    refresh() {
      this.scroll.refresh();
    },
  },
  mounted() {
    this.scroll = new BetterScroll(".wrapper", {
      click: this.click,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,

      // movable: true,
      // zoom: true,
    });
    if (this.probeType > 1)
    this.scroll.on("scroll", (y) => {
      this.$emit("scroll", y);
    });
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style>
.wrapper {
  height: 100%;
  margin-bottom: -49px;
}
</style>