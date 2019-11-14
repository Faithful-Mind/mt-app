<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <category :types="types" :areas="areas" />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Category from '@/components/products/category.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'

export default {
  components: {
    Crumbs,
    Category,
    List,
    Amap
  },
  data () {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: []
    }
  },
  async asyncData (ctx) {
    const keyword = ctx.query.keyword
    const city = ctx.store.state.geo.position.city
    const { status, data: { count, pois } } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
