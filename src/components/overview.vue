<!--
 * @Description: overview
 * @Author: Sunly
 * @Date: 2024-05-22 21:59:17
-->
<script lang="ts" setup>
import { MessagePlugin } from 'tdesign-vue-next'
import {
  type IData,
  activeFolder,
  addCurFolder,
  curFolder,
  deleteCurFolder,
  editCurFolder,
  init,
  openFolder,
} from '../hooks/useData'
import RightMenu, { type IList } from './rightMenu.vue'
import FileItem from './fileItem.vue'

defineOptions({
  name: 'Overview',
})

const menuRef = ref<null | InstanceType<typeof RightMenu>>(null)

function handleClick(data: IData) {
  if (data.type === 'link')
    window.open(data.src, '_blank')
  else if (data.type === 'folder')
    openFolder(data.id)
}
const dialogData = reactive({
  visible: false,
  name: '',
  type: 'folder' as 'folder' | 'link',
  src: '',
  dialogType: '' as 'add' | 'edit' | 'del',
  id: '',
})

const delDialogData = reactive({
  visible: false,
  pId: '',
  id: '',
  title: '',
})

function handleShowMenu(e: MouseEvent, type: 'folder' | 'link' | 'other', file?: IData) {
  e.stopPropagation()
  if (type !== 'other' && type !== 'folder' && type !== 'link')
    return
  e.preventDefault()
  const list = ref<IList[]>([])
  if (type === 'other') {
    list.value = [
      {
        name: '新建文件夹',
        action: () => {
          dialogData.name = ''
          dialogData.type = 'folder'
          dialogData.src = ''
          dialogData.id = activeFolder.value?.id || ''
          dialogData.dialogType = 'add'
          dialogData.visible = true
        },
      },
      {
        name: '新建链接',
        action: () => {
          dialogData.name = ''
          dialogData.type = 'link'
          dialogData.src = ''
          dialogData.id = activeFolder.value?.id || ''
          dialogData.dialogType = 'add'
          dialogData.visible = true
        },
      },
    ]
  }
  else if (type === 'folder') {
    list.value = [
      {
        name: '打开文件夹',
        action: () => {
          if (file)
            openFolder(file.id, true)
        },
      },
      {
        name: '重命名',
        action: () => {
          dialogData.name = file?.name || ''
          dialogData.type = 'folder'
          dialogData.src = ''
          dialogData.id = file?.id || ''
          dialogData.dialogType = 'edit'
          dialogData.visible = true
        },
      },
      {
        name: '删除',
        action: () => {
          delDialogData.id = file?.id || ''
          delDialogData.pId = file?.pId || ''
          delDialogData.title = `确定要删除文件夹 ${file?.name} 吗？`
          delDialogData.visible = true
        },
      },
    ]
  }
  else {
    list.value = [
      {
        name: '在新窗口打开链接',
        action: () => {
          if (file?.type === 'link')
            window.open(file.src, '_blank')
        },
      },
      {
        name: '修改链接',
        action: () => {
          dialogData.name = file?.name || ''
          dialogData.type = 'link'
          dialogData.src = file?.type === 'link' ? file.src : ''
          dialogData.id = file?.id || ''
          dialogData.dialogType = 'edit'
          dialogData.visible = true
        },
      },
      {
        name: '复制链接',
        action: () => {
          if (file?.type === 'link') {
            navigator.clipboard.writeText(file.src || '')
            MessagePlugin.success('链接已复制到剪贴板')
          }
        },
      },
      {
        name: '删除',
        action: () => {
          delDialogData.id = file?.id || ''
          delDialogData.pId = file?.pId || ''
          delDialogData.title = `确定要删除链接 ${file?.name} 吗？`
          delDialogData.visible = true
        },
      },
    ]
  }
  menuRef.value?.showMenu(e.clientX, e.clientY, list.value)
}

function handleConfirm(name: string, src: string) {
  if (!name) {
    MessagePlugin.error('名称不能为空')
    return
  }

  if (dialogData.dialogType === 'add')
    addCurFolder(dialogData.id, name, dialogData.type, src)
  else if (dialogData.dialogType === 'edit')
    editCurFolder(dialogData.id, name, src)
  dialogData.visible = false
}

function handleDelete() {
  deleteCurFolder(delDialogData.pId, delDialogData.id)
  delDialogData.visible = false
}

init()
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

  <t-dialog
    v-model:visible="delDialogData.visible"
    close-btn
    :close-on-esc-keydown="false"
    :close-on-overlay-click="false"
    :header="delDialogData.title"
    @confirm="handleDelete"
  />

  <RightMenu ref="menuRef" />
  <div
    class="overview"
    @contextmenu.prevent="e => handleShowMenu(e, 'other')"
  >
    <FileItem
      v-for="file in curFolder"
      :key="file.id"
      :name="file.name"
      :type="file.type"
      :class="{ active: activeFolder?.id === file.id }"
      @contextmenu.prevent="e => handleShowMenu(e, file.type, file)"
      @click="handleClick(file)"
    />
  </div>
</template>

<style lang="scss">
.overview {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  padding: 12px;
  .active {
    background-color: #f3f3f3;
  }
}
</style>
