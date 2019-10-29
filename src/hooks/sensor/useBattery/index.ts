import { reactive, onMounted, onUnmounted } from '@vue/composition-api'
import {
  checkBrowser,
  addEventListener,
  removeEventListener,
  warn
} from '../../../utils'

export interface BatteryState {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

type FetchedBatteryState = BatteryState & {
  isSupported: boolean
  fetched: boolean
}

type UseBatteryState =
  | { isSupported: false } // Battery API is not supported
  | FetchedBatteryState // battery API supported

export interface BatteryManager extends Readonly<BatteryState>, EventTarget {
  onchargingchange: VoidFunction
  onchargingtimechange: VoidFunction
  ondischargingtimechange: VoidFunction
  onlevelchange: VoidFunction
}

interface NavigatorWithPossibleBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>
}

const nav: NavigatorWithPossibleBattery | undefined =
  typeof navigator === 'object' ? navigator : undefined
const isBatteryApiSupported = nav && typeof nav.getBattery === 'function'

export default function useBattery(): UseBatteryState {
  checkBrowser(useBattery.name)

  if (!isBatteryApiSupported) {
    return { isSupported: false }
  }

  const state = reactive<FetchedBatteryState>({
    isSupported: true,
    fetched: false,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 0
  })

  let mounted = true
  let battery: BatteryManager | null = null

  const update = () => {
    if (!mounted || !battery) {
      return
    }
    state.isSupported = true
    state.fetched = true
    state.level = battery.level
    state.charging = battery.charging
    state.dischargingTime = battery.dischargingTime
    state.chargingTime = battery.chargingTime
  }

  onMounted(() => {
    nav!.getBattery!()
      .then((bm: BatteryManager) => {
        if (!mounted) return
        battery = bm
        addEventListener(battery, 'chargingchange', update)
        addEventListener(battery, 'chargingtimechange', update)
        addEventListener(battery, 'dischargingtimechange', update)
        addEventListener(battery, 'levelchange', update)
        update()
      })
      .catch(warn)
  })

  onUnmounted(() => {
    mounted = false
    if (battery) {
      removeEventListener(battery, 'chargingchange', update)
      removeEventListener(battery, 'chargingtimechange', update)
      removeEventListener(battery, 'dischargingtimechange', update)
      removeEventListener(battery, 'levelchange', update)
    }
  })

  return state
}
