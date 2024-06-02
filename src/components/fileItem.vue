<!--
 * @Description: 文件夹/链接文件
 * @Author: Sunly
 * @Date: 2024-05-22 22:15:58
-->
<script lang="ts" setup>
import folderIcon from '../assets/folder.png'
import linkIcon from '../assets/link.png'

defineOptions({
  name: 'FileItem',
})

defineProps<{
  name: string
  type: 'folder' | 'link'
}>()
</script>

<template>
  <div class="file-item">
    <img :src="type === 'folder' ? folderIcon : linkIcon">
    <div class="name">
      {{ name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  height: 60px;
  margin: 12px;
  padding: 0 12px;
  cursor: pointer;
  box-shadow: 0 0 5px #ccc;
  img {
    margin-right: 12px;
    width: 40px;
    height: 40px;
  }
  .name {
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
