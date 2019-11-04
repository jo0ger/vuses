import { reactive, onMounted, onUnmounted } from '@vue/composition-api'
import {
  checkBrowser,
  isObject,
  addEventListener,
  removeEventListener
} from '../../../utils'

export interface NetworkState {
  online?: boolean
  since?: Date
  downlink?: number
  downlinkMax?: number
  effectiveType?: string
  rtt?: number
  type?: string
}

const getConnection = () => {
  if (!isObject(navigator)) {
    return null
  }
  const nav = navigator as any
  return nav.connection || nav.mozConnection || nav.webkitConnection
}

const getConnectionState = (): NetworkState => {
  const connection = getConnection()
  if (!connection) {
    return {}
  }
  const { downlink, downlinkMax, effectiveType, type, rtt } = connection
  return {
    downlink,
    downlinkMax,
    effectiveType,
    type,
    rtt
  }
}

const defaultState = {
  online: false,
  since: undefined,
  downlink: undefined,
  downlinkMax: undefined,
  effectiveType: undefined,
  rtt: undefined,
  type: undefined
}

export default function useNetwork(
  initialState: NetworkState = defaultState
): NetworkState {
  checkBrowser(useNetwork.name)

  const state = reactive(initialState)
  const connection = getConnection()

  const setState = (patch: Partial<NetworkState> = {}) => {
    for (const key in patch) {
      if (patch.hasOwnProperty(key)) {
        // @ts-ignore
        state[key] = patch[key as keyof NetworkState]
      }
    }
  }

  const online = () =>
    setState({
      online: true,
      since: new Date()
    })

  const offline = () =>
    setState({
      online: false,
      since: new Date()
    })

  const change = () => setState(getConnectionState())

  onMounted(() => {
    addEventListener(window, 'online', online)
    addEventListener(window, 'offline', offline)
    if (connection) {
      addEventListener(connection, 'change', change)
      setState({
        online: navigator.onLine,
        since: undefined,
        ...getConnectionState()
      })
    }
  })

  onUnmounted(() => {
    removeEventListener(window, 'online', online)
    removeEventListener(window, 'offline', offline)
    if (connection) {
      removeEventListener(connection, 'change', change)
    }
  })

  return state as NetworkState
}
