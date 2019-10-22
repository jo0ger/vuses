// Just for test
import Vue from 'vue'
import CompositionAPI, { createComponent } from '@vue/composition-api'
import { SetupFunction, Data } from '@vue/composition-api/dist/component'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(CompositionAPI)

export function renderHook<Inject = any, Props = unknown, RawBindings = Data>(
  setup: SetupFunction<Props, RawBindings>,
  shallow: boolean = true
) {
  // @ts-ignore
  const root = createComponent<Props, RawBindings>({
    template: `
      <div id="app" :style="{ width: '200vw', height: '200vh' }">
      </div>
    `,
    setup
  })

  return (shallow ? shallowMount : mount)<Vue & Inject>(root, {
    localVue
  })
}
