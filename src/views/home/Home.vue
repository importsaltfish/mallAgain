<template>
  <div id="home">
    <nav-bar class="nav">
      <div slot="center">首页</div>
    </nav-bar>

    <tab-control
      class="tab-control-fixed"
      ref="tabControl1"
      :titles="TabControlTitles"
      @titleClick="titleClick"
      v-show="tabControlFixed"
    />

    <scroll
      class="scroll"
      ref="scroll"
      :click="true"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="scroll"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @imageLoad="imageLoad" />
      <recommend :recommends="recommends" />
      <feature-view />
      <tab-control
        ref="tabControl2"
        :titles="TabControlTitles"
        @titleClick="titleClick"
      />
      <goods :goodsList="goodsList" />
    </scroll>
    <back-top @click.native="backTop" v-show="isBackTop"/>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/common/tabControl/TabControl.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import Goods from "components/content/goods/Goods.vue";
import BackTop from 'components/content/backTop/BackTop.vue';

import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import FeatureView from "./childComps/FeatureView";

export default {
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    FeatureView,
    TabControl,
    Scroll,
    Goods,
    BackTop
  },
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      TabControlTitles: ["流行", "新款", "精选"],
      goodsType: ["sell", "pop", "new"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabControlFixed: false,
      isBackTop: false
    };
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
    this.getHomeGoods("new");
  },
  computed: {
    goodsList() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.scroll.finishPullUp()
      });
    },
    //事件监听
    titleClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // console.log(this.goods[this.currentType].list);
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    scroll(y) {
      // console.log(this.$refs.scroll.TabCcontrol.offsetTop);
      // console.log(y.y);
      this.tabControlFixed = -y.y >= 590;
      // console.log(this.tabControlFixed);
      this.isBackTop = -this.$refs.scroll.scroll.y > 2000
    },
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
    },
    pullingUp() {
      this.getHomeGoods(this.currentType)
    },
    backTop() {
      this.$refs.scroll.scroll.scrollTo(0,0)
    }


  },
  activated() {

  },
  mounted() {
    //之前在activated中使用，获取不到refresh，人都麻了
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("goodsImageLoad", () => {
      refresh()
    });
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  overflow: hidden;
}
.nav {
  background-color: var(--color-tint);
  color: aliceblue;
}
.tab-control-fixed {
  position: fixed;
  top: 43px;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1;
}
.scroll {
  /* margin-top: 44px; */
  height: calc(100% - 44px - 49px);
  background-color: #fff;
  overflow: hidden;
}
</style>