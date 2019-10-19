# vueues

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
  import { useCounter } from 'vueues'

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

## Hooks

* State:
  * `useCounter`: tracks state of a number

## Contributing

Please see [Contributing](./CONTRIBUTING.md)

## Contributors

<a href="https://github.com/jo0ger"><img src="https://avatars0.githubusercontent.com/u/16385416?s=460&v=4" title="Jooger" width="80" height="80"></a>


## License

[MIT](./LICENSE)
