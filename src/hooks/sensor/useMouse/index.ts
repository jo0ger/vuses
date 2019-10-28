import {
  checkBrowser,
  addEventListener,
  removeEventListener,
  isFunction
} from '../../../utils'
import { reactive, onMounted, onUnmounted } from '@vue/composition-api'

export interface MousePosition {
  docX: number
  docY: number
  posX: number
  posY: number
  elX: number
  elY: number
  elH: number
  elW: number
}

export default function useMouse(
  elem: HTMLElement | (() => HTMLElement)
): MousePosition {
  checkBrowser(useMouse.name)

  const getElem = isFunction(elem) ? elem : () => elem
  const state = reactive<MousePosition>({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0
  })

  const update = (e: Event) => {
    const { left, top, width, height } = getElem().getBoundingClientRect()
    const posX = left + window.pageXOffset
    const posY = top + window.pageYOffset
    state.docX = (e as MouseEvent).pageX
    state.docY = (e as MouseEvent).pageY
    state.posX = posX
    state.posY = posY
    state.elX = (e as MouseEvent).pageX - posX
    state.elY = (e as MouseEvent).pageY - posY
    state.elW = width
    state.elH = height
  }

  onMounted(() => addEventListener(document, 'mousemove', update))

  onUnmounted(() => removeEventListener(document, 'mousemove', update))

  return state
}
