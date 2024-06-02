/*
 * @Description: 数据
 * @Author: Sunly
 * @Date: 2024-05-22 22:08:42
 */
import { v4 as uuid } from 'uuid'
import { pushHistory } from './useHistory'

type IData = {
  name: string
  id: string
  pId: string
  type: 'folder'
  children?: IData[]
} | {
  name: string
  id: string
  pId: string
  type: 'link'
  src: string
  children?: IData[]
}

const data = useLocalStorage<IData>('__FAVORITE_LINKS', {
  name: 'root',
  id: '-1',
  pId: '-1',
  type: 'folder',
  children: [],
})

// 递归找到id对应的children
function findFilesById(folder: IData, id: string): IData | null {
  if (folder.id === id)
    return folder

  if (folder.children) {
    for (const child of folder.children) {
      const res = findFilesById(child, id)
      if (res)
        return res
    }
  }

  return null
}

// 递归找到id对应的父级
function findParentsById(data: IData, id: string, res: IData[] = []): IData[] | null {
  if (id === '-1') {
    res.unshift(data)
    return res
  }

  const target = findFilesById(data, id)
  if (target) {
    res.unshift(target)
    findParentsById(data, target.pId, res)
  }
  return res
}

const curId = ref('-1')
const dirs = ref<IData[]>([])
const curFolder = ref<IData[]>([])
const activeFolder = ref<IData | null>(null)

function openFolder(id: string, editHistory = true) {
  const res = findFilesById(data.value, id)
  if (!res)
    return

  curFolder.value = res.children || []
  curId.value = id
  activeFolder.value = res
  dirs.value = findParentsById(data.value, id) || [data.value]
  if (editHistory)
    pushHistory(id)
}

function addCurFolder(id: string, name: string, type: 'folder' | 'link', src?: string) {
  if (id == null)
    return

  const parent = findFilesById(data.value, id)
  if (!parent)
    return

  if (!parent.children)
    parent.children = []

  parent.children.push(type === 'link'
    ? {
        name,
        id: uuid(),
        pId: id,
        type,
        src: src || '',
      }
    : {
        name,
        id: uuid(),
        pId: id,
        type,
        children: [],
      },
  )
}

function editCurFolder(id: string, name: string, src?: string) {
  if (id == null)
    return

  const origin = findFilesById(data.value, id)
  if (origin)
    origin.name = name
  if (origin?.type === 'link' && src)
    origin.src = src
}

function deleteCurFolder(pId: string, id: string) {
  if (id === '-1' || pId == null || id == null)
    return

  const parent = findFilesById(data.value, pId)
  const index = parent?.children?.findIndex(item => item.id === id)
  if (index != null && index !== -1)
    parent?.children?.splice(index, 1)
}

function init() {
  onMounted(() => {
    dirs.value = [data.value]
    curFolder.value = data.value.children || []
    activeFolder.value = data.value
  })
}

export {
  init,
  openFolder,
  curFolder,
  dirs,
  activeFolder,
  addCurFolder,
  editCurFolder,
  deleteCurFolder,
}

export type { IData }
