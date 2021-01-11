<template>
  <div class="detail">
    <detail-nav-bar @themeClick="themeClick" :currentIndex="currentIndex"/>
    <scroll class="scroll" ref="scroll" 
    :click="true" 
    :probeType="3"
    @scroll="scroll">
      <detail-swiper :top-images="topImages" />
      <base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-desc :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comments" :commentInfo="commentInfo" />

      <goods-list ref="recommend" :goodsList="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import {
  getDetailInfo,
  Goods,
  Shop,
  GoodsParam,
  getRecommends,
} from "network/detail";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/Goods.vue";

import {debounce} from 'common/utils'

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import BaseInfo from "./childComps/BaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsDesc from "./childComps/DetailGoodsDesc.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    Scroll,
    BaseInfo,
    DetailShopInfo,
    DetailGoodsDesc,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themesOffsetTop: [],
      currentIndex: 0,

      message: '',
      show: false
    };

  },
  methods: {

    //refresh和获取themesOffsetTop
    imageLoad() {
      //这个imageLoad里面已经经过debounce处理了
      this.$refs.scroll.scroll.refresh();

      this.themesOffsetTop.push(0);
      this.themesOffsetTop.push(this.$refs.params.$el.offsetTop);
      this.themesOffsetTop.push(this.$refs.comments.$el.offsetTop);
      this.themesOffsetTop.push(this.$refs.recommend.$el.offsetTop);
    },
    themeClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themesOffsetTop[index] + 44);
      this.currentIndex = index
    },
    scroll() {
      let scrollY = -this.$refs.scroll.scroll.y + 44
      if (scrollY < this.themesOffsetTop[1]) {
        this.currentIndex = 0
        return
      } else if (scrollY < this.themesOffsetTop[2]) {
        this.currentIndex = 1
        return
      }else if (scrollY < this.themesOffsetTop[3]) {
        this.currentIndex = 2
        return
      }else {
        this.currentIndex = 3
        return
      }
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.$store.dispatch("addCart", product).then(res => {
        this.$toast.show(res)
        console.log(res);
      })
      
    }
  },
  created() {
    //传入的iid
    this.iid = this.$route.params.iid;
    //获取数据
    getDetailInfo(this.iid).then((res) => {
      // console.log(res);
      const data = res.data.result;
      //分类保存
      //轮播图
      this.topImages = data.itemInfo.topImages;
      //商品基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息
      this.shop = new Shop(data.shopInfo);
      //商品描述+穿着效果图
      this.detailInfo = data.detailInfo;
      //商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //用户评价
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //推荐的其他商品
    getRecommends().then((res) => {
      // console.log(res);
      this.recommends = res.data.data.list;
      // console.log(this.recommends);
    });
  },
  mounted() {
    this.$bus.$on('detailImagesLoad', () => {
      if(this.$refs.scroll) {
      debounce(this.$refs.scroll.scroll.refresh(), 200)
    }
    })
  },
};
</script>

<style scoped>
.detail {
  overflow: hidden;
  height: 100vh;
}
.swiper img {
  width: 100%;
}
.scroll {
  overflow: hidden;
  height: calc(100% - 44px - 49px);
}
</style>