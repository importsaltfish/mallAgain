<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <br>
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
    display: flex;
    margin-top: 8px;
    padding-bottom: 2px;
    border-bottom: 8px solid #eee;
  }
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend-item img {
  width: 80%;
}
</style>