<template>
  <div class="" />
</template>

<script>
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    const { status, data } = await ctx.$axios.get('/user/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
