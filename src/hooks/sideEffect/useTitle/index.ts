import { Ref, watch, ref, isRef, onUnmounted } from '@vue/composition-api'
import { checkBrowser } from '../../../utils'

export default function useTitle(
  title?: string | Ref<string>
): [Ref<string>, (val: string) => void] {
  checkBrowser(useTitle.name)

  const convert = <T>(val: T) => String(val)

  if (!isRef(title)) {
    if (title === void 0) {
      title = document.title
    }
    title = ref(convert(title))
  }

  const unwatch = watch(title, (val: string) => (document.title = val))

  onUnmounted(unwatch)

  const update = (val: string) => {
    ;(title as Ref<string>).value = convert(val)
  }
  return [title, update]
}
