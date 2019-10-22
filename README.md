# vuses

Vue Hooks built with Vue Composition Api

> For Vue 3, but also compatible with Vue 2

## Usage

if you are using `Vue2`, you must first import `@vue/composition-api` package:

``` ts
import Vue from 'vue'
import CompositionAPI from '@vue/composition-api'

Vue.use(CompositionAPI) // required for Vue2
```

and then:

``` vue
<template>
  <div>
    <p>{{ counter }}</p>
    <button @click="inc">inc</button>
    <button @click="dec">dec</button>
  </div>
</template>

<script>
  import { useCounter } from 'vuses'

  export default {
    setup () {
      const [counter, { inc, dec }] = useCounter()
      return {
        counter,
        inc,
        dec
      }
    }
  }
</script>
```

## Hooks Plan

* State:
  * [x] [`useCounter`](./src/hooks/state/useCounter/doc.md): tracks state of a number
  * [x] [`useToggle`](./src/hooks/state/useToggle/doc.md) and [`useBoolean`](./src/hooks/state/useBoolean/doc.md): tracks state of a boolean
  * [] `usePrevious`: returns the previous state or props
  * [] `useDefault`: returns the default value when state is `null` or `undefined`
  * [] `useGetSet`: returns state getter `get()` instead of raw state
  * [] `useGetSetState`: as if `useGetSet` and `useSetState` had a baby
  * [] `useObservable`: tracks latest value of an `Observable`
  * [] `useStateList`: circularly iterates over an array
  * [] `useList`: tracks state of an array
  * [] `useMap`: tracks state of an object
  * [] `useStateValidator`: tracks state of an object
* Sensors:
  * [x] [`useWindowSize`](./src/hooks/sensor/useWindowsize/doc.md): tracks `Widnow` dimensions(browser environment is required)
  * [] `useWindowScroll`: tracks Window scroll position
  * [] `useBattery`: tracks device battery state
  * [] `useGeolocation`: tracks geo location state of user's device
  * [] `useIdle`: tracks whether user is being inactive
  * [] `useIntersection`: tracks an HTML element's intersection
  * [] `useEvent`: subscribe to events
  * [] `useMedia`: tracks state of a CSS media query
  * [] `useMediaDevices`: tracks connected hardware devices
  * [] `useMotion`: tracks state of device's motion sensor
  * [] `useMouse`: tracks state of mouse position
  * [] `useNetwork`: tracks state of user's internet connection
  * [] `usePageLeave`: triggers when mouse leaves page boundaries
  * [] ``: 
* Side Effects:
  * [] `useDebounce`: debounces a function
  * [] `useThrottle`: throttles a function
  * [] `useAsync`: resolves an async function
  * [] `useLocalStorage`: manages a value in `localStorage`
  * [] `useSessionStorage`: manages a value in `sessionStorage`
  * [] `useFavicon`: sets favicon of the page
  * [] `useTitle`: sets title of the page
  * [] `usePermission`: query permission status for browser APIs
* UI:
  * `useClickAway`: triggers callback when user clicks outside target area
  * `useCss`: dynamically adjusts CSS
  * `useFullscreen`: display an element or video full-screen
  * `useWait`: complex waiting management for UIs
* Animations:
  * `useTimeout`: re-renders component after a timeout
  * `useInterval`: re-renders component on a set interval using `setInterval`

## Contributing

Please see [Contributing](./CONTRIBUTING.md)

## Contributors

<a href="https://github.com/jo0ger"><img src="https://avatars0.githubusercontent.com/u/16385416?s=460&v=4" title="Jooger" width="80" height="80"></a>


## License

[MIT](./LICENSE)
