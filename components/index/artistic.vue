<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd :class="{active:kind==='all'}" kind="all" keyword="景点">全部</dd>
      <dd :class="{active:kind==='part'}" kind="part" keyword="美食">约会聚餐</dd>
      <dd :class="{active:kind==='spa'}" kind="spa" keyword="丽人">丽人SPA</dd>
      <dd :class="{active:kind==='movie'}" kind="movie" keyword="电影">电影演出</dd>
      <dd :class="{active:kind==='travel'}" kind="travel" keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in curr" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [
          {
            title: '大教堂蛋糕 Kathedral（王府中环店）',
            img: '//p1.meituan.net/msmerchant/913c7d2286d407e79a06bd77514b22df176709.jpg@496w_280h_1e_1c',
            pos: '蛋糕4选1,约1.9磅',
            price: 398
          }, {
            title: '祈年8号中餐厅',
            img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@496w_280h_1e_1c',
            pos: '单人奢华点心自助',
            price: 128
          }, {
            title: '丰泽园饭店（王府井店）',
            img: '//p0.meituan.net/msmerchant/c08c616aa835bc7cebdc3bd17184afef312214.jpg@496w_280h_1e_1c',
            pos: '2人自选套餐，提供免费WiFi',
            price: 248
          }, {
            title: '内蒙古大厦·玛那自助西餐厅',
            img: '//p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@496w_280h_1e_1c',
            pos: '单人午市自助套餐',
            price: 158
          }, {
            title: '楼兰新疆主题餐厅（合景·摩方店）',
            img: '//p1.meituan.net/bbia/d82849e7d5bb71dea7ce97a753ee465a676648.jpg@496w_280h_1e_1c',
            pos: '楼兰3~4人套餐',
            price: 198
          }, {
            title: '313羊庄·铁锅烀羊肉（王府井店）',
            img: '//p1.meituan.net/msmerchant/fe8cf51c205643c1f884444f71cb259b431178.png@496w_280h_1e_1c',
            pos: '单人自助餐',
            price: 168
          }
        ],
        part: [
          {
            title: '313羊庄·铁锅烀羊肉（王府井店）',
            img: '//p1.meituan.net/msmerchant/fe8cf51c205643c1f884444f71cb259b431178.png@496w_280h_1e_1c',
            pos: '铁锅烀羊肉•双人餐',
            price: 298,
            place: '王府井/东单'
          }, {
            title: '那年约火锅·烤场（回龙观店）',
            img: '//p0.meituan.net/msmerchant/16baae88c5d8d56af8c9146811147c511422264.png@496w_280h_1e_1c',
            pos: '任性超级自助套餐',
            price: 79.9,
            place: '回龙观'
          }, {
            title: '中央电视塔空中观景旋转餐厅',
            img: '//p1.meituan.net/msmerchant/7776f22c9d6fd0413b7e52441b3f74557386836.jpg@496w_280h_1e_1c',
            pos: '自助晚餐',
            price: 308,
            place: '航天桥'
          }, {
            title: '八斗鸡·私房菜（新世界百货崇文店）',
            img: '//p1.meituan.net/msmerchant/79543b15002c2a399e5837932659897625824.png@496w_280h_1e_1c',
            pos: '2-3人套餐，提供免费WiFi',
            price: 168,
            place: '崇文门新世界'
          }, {
            title: '祈年8号中餐厅',
            img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@496w_280h_1e_1c',
            pos: '单人奢华点心自助',
            price: 128,
            place: '崇文门新世界'
          }, {
            title: '内蒙古大厦·玛那自助西餐厅',
            img: '//p1.meituan.net/mogu/a3c70845bffd26ce9df01de67c1971e0735080.jpg@496w_280h_1e_1c',
            pos: '单人午市自助套餐',
            price: 158,
            place: '王府井/东单'
          }
        ],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    curr () {
      return this.list[this.kind]
    }
  },
  methods: {
    over (e) {
      const dom = e.target
      if (dom.tagName.toLowerCase() === 'dd') {
        this.kind = dom.getAttribute('kind')
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
