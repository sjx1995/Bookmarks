/*
 * @Description: 前进/后退
 * @Author: Sunly
 * @Date: 2024-05-23 23:49:23
 */
import { activeFolder, openFolder } from './useData'

const historyStack = ref<string[]>(['-1'])
const historyIndex = ref<number>(0)

function pushHistory(id: string) {
  historyStack.value = historyStack.value.slice(0, historyIndex.value + 1)
  if (historyStack.value[historyStack.value.length - 1] === id)
    return
  historyStack.value.push(id)
  historyIndex.value++
}

function goBack() {
  if (historyIndex.value > 0) {
    historyIndex.value--
    activeFolder.value = null
    openFolder(historyStack.value[historyIndex.value], false)
  }
}

function goForward() {
  if (historyIndex.value < historyStack.value.length - 1) {
    historyIndex.value++
    activeFolder.value = null
    openFolder(historyStack.value[historyIndex.value], false)
  }
}

const allowBack = computed(() => historyIndex.value > 0)

const allowForward = computed(() => historyIndex.value < historyStack.value.length - 1)

export { historyIndex, pushHistory, goBack, goForward, allowBack, allowForward, historyStack }
