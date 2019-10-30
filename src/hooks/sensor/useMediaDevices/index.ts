import { onMounted, onUnmounted, reactive } from '@vue/composition-api'
import { addEventListener, removeEventListener, warn } from '../../../utils'

export type MediaDevices = Partial<MediaDeviceInfo>[]

export default function useMediaDevices(): MediaDevices {
  const state = reactive<MediaDevices>([])
  let mounted = true

  const update = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        if (!mounted) return
        devices.forEach(({ deviceId, groupId, kind, label }) => {
          state.push({ deviceId, groupId, kind, label })
        })
      })
      .catch(warn)
  }

  onMounted(() => {
    update()
    addEventListener(navigator.mediaDevices, 'devicechange', update)
  })

  onUnmounted(() => {
    mounted = false
    removeEventListener(navigator.mediaDevices, 'devicechange', update)
  })

  return state
}
