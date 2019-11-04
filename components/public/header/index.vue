<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="4">
      <Geo />
    </el-col>
    <el-col :span="6">
      <User />
    </el-col>
    <el-col :span="14">
      <div class="grid-content bg-purple" />
    </el-col>
  </el-row>
</template>

<script>
import Geo from './geo.vue'
import User from './user.vue'

export default {
  components: {
    Geo,
    User
  }
}
</script>

<style lang="scss">
@import "@/assets/css/public/layout.scss";
</style>
