<!--
 * @Description: detail
 * @Author: Sunly
 * @Date: 2024-05-22 21:58:12
-->
<script lang="ts" setup>
import { type IData, activeFolder, editCurFolder } from '../hooks/useData'
import folderIcon from '../assets/folder.png'
import linkIcon from '../assets/link.png'
import Dialog from './dialog.vue'

defineOptions({
  name: 'Detail',
})

function handleOpenLink(data: IData) {
  if (data.type === 'link' && data.src)
    window.open(data.src, '_blank')
}

const dialogData = reactive({
  visible: false,
  name: '',
  type: 'folder' as 'folder' | 'link',
  src: '',
})
function handleShowDialog(data: IData) {
  dialogData.visible = true
  dialogData.name = data.name
  dialogData.type = data.type
  dialogData.src = data.type === 'link' ? data.src : ''
}

function handleConfirm(name: string) {
  if (!activeFolder.value) {
    MessagePlugin.error('名称不能为空')
    return
  }
  if (activeFolder.value)
    editCurFolder(activeFolder.value.id, name)
  dialogData.visible = false
}
</script>

<template>
  <Dialog
    v-model="dialogData.visible"
    :name="dialogData.name"
    :type="dialogData.type"
    :src="dialogData.src"
    :allow-change-type="false"
    @confirm="handleConfirm"
  />

  <div class="detail">
    <div v-if="activeFolder" class="folder-detail">
      <img :src="activeFolder?.type === 'folder' ? folderIcon : linkIcon">
      <div class="detail-name">
        {{ activeFolder?.name }}
      </div>
      <div>
        <t-button variant="text" theme="primary" @click="handleShowDialog(activeFolder)">
          修改
        </t-button>
        <t-button v-if="activeFolder?.type === 'link'" variant="text" theme="primary" @click="handleOpenLink(activeFolder)">
          打开链接
        </t-button>
      </div>
    </div>
    <div v-else class="empty">
      <t-alert message="未选择文件夹" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  .detail-name {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
  }
  .folder-detail {
    text-align: center;
    div {
      margin-top: 8px;
    }
  }
}
</style>
