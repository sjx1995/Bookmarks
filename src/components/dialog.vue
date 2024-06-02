<!--
 * @Description: 修改文件
 * @Author: Sunly
 * @Date: 2024-05-24 22:35:28
-->
<script lang="ts" setup>
const props = defineProps<{
  name: string
  type: 'folder' | 'link'
  src?: string
}>()

const emits = defineEmits<{
  (e: 'confirm', name: string, src: string): void
}>()

const visible = defineModel<boolean>()

const dialogName = ref('')
const dialogType = ref<'folder' | 'link'>('folder')
const dialogSrc = ref('')
watch(() => visible.value, (val) => {
  if (val) {
    dialogName.value = props.name
    dialogType.value = props.type
    dialogSrc.value = props.src || ''
  }
})

function handleOk() {
  emits('confirm', dialogName.value, dialogSrc.value)
}
</script>

<template>
  <t-dialog
    v-model:visible="visible"
    close-btn
    :close-on-esc-keydown="false"
    :close-on-overlay-click="false"
    @confirm="handleOk"
  >
    <div class="item">
      <div class="label">
        {{ type === 'folder' ? '文件夹名称' : '链接名称' }}
      </div>
      <t-input v-model.trim="dialogName" />
    </div>
    <div v-show="dialogType === 'link'" class="item">
      <div class="label">
        链接地址
      </div>
      <t-input v-model.trim="dialogSrc" />
    </div>
  </t-dialog>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .label {
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
}
</style>
