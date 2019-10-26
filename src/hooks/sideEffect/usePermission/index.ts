import { ref, Ref, onMounted, onUnmounted } from '@vue/composition-api'
import {
  checkBrowser,
  noop,
  addEventListener,
  removeEventListener
} from '../../../utils'

type PermissionDesc =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor

type State = PermissionState | ''

export default function usePermission(
  permissionDesc: PermissionDesc
): Ref<State> {
  checkBrowser(usePermission.name)

  const state = ref<State>('')
  let permissionStatus: PermissionStatus | null = null
  let mounted = true

  const update = () => {
    if (mounted && permissionStatus) {
      state.value = permissionStatus.state
    }
  }

  onMounted(() => {
    navigator.permissions
      .query(permissionDesc)
      .then(status => {
        permissionStatus = status
        update()
        addEventListener(permissionStatus, 'change', update)
      })
      .catch(noop)
  })

  onUnmounted(() => {
    mounted = false
    if (permissionStatus) {
      removeEventListener(permissionStatus, 'change', update)
    }
  })

  return state
}
