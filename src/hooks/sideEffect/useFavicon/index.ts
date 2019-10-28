import { Ref, isRef, ref, watch } from '@vue/composition-api'
import { checkBrowser } from '../../../utils'

export default function useFavicon(href: string | Ref<string>) {
  checkBrowser(useFavicon.name)

  const isref = isRef(href)
  const _href = isref ? href : ref(href)

  const update = (val: string) => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = val
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  update((_href as Ref<string>).value)

  if (isref) {
    watch(_href as Ref<string>, update, {
      lazy: true,
      flush: 'sync'
    })
  }
}
