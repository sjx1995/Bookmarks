<!--
 * @Description: Header
 * @Author: Sunly
 * @Date: 2024-05-22 22:00:45
-->
<script lang="ts" setup>
import { allowBack, allowForward, goBack, goForward } from '../hooks/useHistory'
import redoImg from '../assets/redo.png'
import redoDisableImg from '../assets/redo-disable.png'
import undoImg from '../assets/undo.png'
import undoDisableImg from '../assets/undo-disable.png'
import Breadcrumb from './breadcrumb.vue'

defineOptions({
  name: 'HeaderPage',
})
</script>

<template>
  <header>
    <div class="operate-icon">
      <img :src="allowBack ? undoImg : undoDisableImg" @click="goBack">
    </div>
    <div class="operate-icon">
      <img :src="allowForward ? redoImg : redoDisableImg" @click="goForward">
    </div>
    <Breadcrumb />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  .operate-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin: 4px;
    padding: 8px;
    border-radius: 4px;
    &:hover {
      background: rgba($color: #000000, $alpha: 0.05);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
