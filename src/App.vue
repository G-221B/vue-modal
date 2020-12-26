<template>
  <div id="app">
    <h2>app</h2>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    // this.modal('标题', '默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。', '', true)
    //   .then((e) => {
    //     console.log(e)
    //     if (e.type === 'concel') {
    //       console.log('取消了')
    //     } else {
    //       console.log('确定了')
    //     }
    //   })
    this.modal('温馨提示',
      '是否确定退出？',
      { textAlign: 'center', color: 'red' },
      true,
      () => {
        console.log('确定了')
      }, () => {
        console.log('取消了')
      })
  }
}
</script>
<style>
</style>
