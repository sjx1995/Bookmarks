<!--
 * @Description: app
 * @Author: Sunly
 * @Date: 2024-05-22 21:34:57
-->
<script  lang="ts" setup>
import Detail from './components/detail.vue'
import Header from './components/header.vue'
import Overview from './components/overview.vue'
</script>

<template>
  <Header />
  <main>
    <Overview />
    <Detail />
  </main>
</template>

<style lang="scss">
header {
  background-color: #f0f0f0;
  height: 48px;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
}
main {
  height: calc(100vh - 48px);
  display: flex;
  overflow: hidden;
  .overview {
    height: 100%;
    flex: 1;
    border-right: 1px solid #eaeaea;
  }
  .detail {
    width: 400px;
  }
}
</style>
