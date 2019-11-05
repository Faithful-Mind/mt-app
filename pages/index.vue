<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5"><Emenu /></el-col>
      <el-col :span="19"><Life /></el-col>
    </el-row>
    <el-row>
      3
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu.vue'
import Life from '@/components/index/life.vue'

export default {
  components: {
    Emenu,
    Life
  }
}
</script>

<style lang='scss'>
@import "@/assets/css/index/index.scss";
</style>
