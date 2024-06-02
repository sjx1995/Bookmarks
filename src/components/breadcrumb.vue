<!--
 * @Description: 面包屑
 * @Author: Sunly
 * @Date: 2024-05-23 00:15:14
-->
<script lang="ts" setup>
import { type IData, activeFolder, dirs, openFolder } from '../hooks/useData'
import folderIcon from '../assets/folder.png'
import linkIcon from '../assets/link.png'

defineOptions({
  name: 'Breadcrumb',
})

function handleClick(item: IData) {
  openFolder(item.id)
  activeFolder.value = item
}
</script>

<template>
  <div id="breadcrumb">
    <span v-for="(item, i) of dirs" :key="item.id">
      <span v-if="i !== 0">
        /
      </span>
      <span class="breadcrumb-item" @click="handleClick(item)">
        <img :src="item.type === 'folder' ? folderIcon : linkIcon">
        {{ item.name }}
      </span>
    </span>
  </div>
</template>

<style lang="scss">
#breadcrumb {
  line-height: 48px;
  margin-left: 16px;
  .breadcrumb-item {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
    &:hover {
      background: rgba($color: #000000, $alpha: 0.05);
    }
    img {
      width: 20px;
      height: 20px;
      vertical-align: text-bottom;
    }
  }
}
</style>
