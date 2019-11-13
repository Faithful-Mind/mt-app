<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in provinces"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!cities.length" placeholder="城市">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      provinces: [],
      pvalue: '',
      cities: [],
      cvalue: '',
      input: '',
      allCities: []
    }
  },
  watch: {
    async pvalue (newPvalue) {
      const { status, data: { city } } = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.cities = city.map(item => ({ value: item.id, label: item.name }))
        this.cvalue = ''
      }
    }
  },
  async mounted () {
    const { status, data: { province } } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.provinces = province.map(item => ({ value: item.id, label: item.name }))
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cb) {
      if (this.allCities.length) {
        cb(this.allCities.filter(item => item.value.includes(query)))
      } else {
        const { status, data: { city } } = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.allCities = city.map(item => ({ value: item.name }))
          cb(this.allCities.filter(item => item.value.includes(query)))
        } else {
          // eslint-disable-next-line standard/no-callback-literal
          cb([])
        }
      }
    }, 200),
    handleSelect (item) {
      console.log(item.value)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
