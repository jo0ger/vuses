import { reactive, onMounted, onUnmounted } from '@vue/composition-api'
import { checkBrowser } from '../../../utils'

export interface GeoLocationSensorState {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error?: Error | PositionError
}

export default function useGeolocation(
  options?: PositionOptions
): GeoLocationSensorState {
  checkBrowser(useGeolocation.name)

  const state = reactive<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now()
  })
  let mounted = true
  let watchId: number | null = null

  const update = (event: Position) => {
    if (mounted) {
      state.loading = false
      state.accuracy = event.coords.accuracy
      state.altitude = event.coords.altitude
      state.altitudeAccuracy = event.coords.altitudeAccuracy
      state.heading = event.coords.heading
      state.latitude = event.coords.latitude
      state.longitude = event.coords.longitude
      state.speed = event.coords.speed
      state.timestamp = event.timestamp
    }
  }

  const error = (error: PositionError) => {
    if (mounted) {
      state.loading = false
      state.error = error
    }
  }

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(update, error, options)
    watchId = navigator.geolocation.watchPosition(update, error, options)
  })

  onUnmounted(() => {
    mounted = false
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
    }
  })

  return state
}
