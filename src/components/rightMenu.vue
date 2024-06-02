<!--
 * @Description: 右键菜单
 * @Author: Sunly
 * @Date: 2024-05-23 23:44:44
-->
<script lang="ts" setup>
const show = ref(false)

const style = reactive({
  left: '0px',
  top: '0px',
})

export interface IList {
  name: string
  action: (...args: any) => void
}
const list = reactive<IList[]>([])

function showMenu(x: number, y: number, menuList: IList[]) {
  show.value = false
  if (menuList.length === 0)
    return
  list.splice(0, list.length, ...menuList)
  style.left = `${x}px`
  style.top = `${y}px`
  show.value = true
}

defineExpose({
  showMenu,
})

onMounted(() => {
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
  window.addEventListener('click', (e) => {
    if (e.button === 0)
      show.value = false
  })
})
</script>

<template>
  <div v-show="show" class="right-menu" :style="style">
    <div v-for="(item, i) of list" :key="i" class="right-menu-item" @click="item.action">
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-menu {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding: 4px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 200px;
  backdrop-filter: blur(5px);
  .right-menu-item {
    cursor: pointer;
    border-radius: 5px;
    padding: 8px 12px;
    &:hover {
      background-color: #f3f3f3;
    }
  }
}
</style>
