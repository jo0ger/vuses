# useNetwork

Vue hook that tracks connected hardware devices.

> Browser environment is required

Returns:

```json
{
  "online": true,
  "since": "2019-11-04T16:13:21.003Z",
  "downlink": 4.4,
  "downlinkMax": null,
  "effectiveType": "4g",
  "rtt": 200,
  "type": "wifi"
}
```

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useNetwork } from 'vuses'

const Demo = createComponent({
  setup() {
    const network = useNetwork()
    return { network }
  },
  render() {
    const { network } = this
    return <pre>{JSON.stringify(network, null, 2)}</pre>
  }
})
```

## Reference

```typescript {2-8}
interface NetworkState {
  online?: boolean
  since?: Date
  downlink?: number
  downlinkMax?: number
  effectiveType?: string
  rtt?: number
  type?: string
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

function useNetwork(initialState: NetworkState = defaultState): NetworkState
```
