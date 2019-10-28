import '../../../src/utils/renderHook'
import { useFavicon } from '../../../src'
import { ref } from '@vue/composition-api'

describe('sideEffect/useFavicon', () => {
  it('should be exported', () => {
    expect(useFavicon).toBeDefined()
  })

  it('should create a HTMLLinkElement', () => {
    const faviconBeforeHook = document.querySelector("link[rel*='icon']")

    expect(faviconBeforeHook).toBe(null)
    useFavicon('My-favicon')
    const faviconAfterHook = document.querySelector("link[rel*='icon']")
    expect(faviconAfterHook).toBeInstanceOf(HTMLLinkElement)
  })

  it('should set the elements type to "image/x-icon"', () => {
    useFavicon('My-favicon')
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const favicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement
    expect(favicon.type).toBe('image/x-icon')
  })

  it('should set the elements rel to "shortcut icon"', () => {
    useFavicon('My-favicon')
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const favicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement
    expect(favicon.rel).toBe('shortcut icon')
  })

  it('should set the elements href to the provided string', () => {
    useFavicon('https://github.com/jo0ger/vuses')
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const favicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement
    expect(favicon.href).toBe('https://github.com/jo0ger/vuses')
  })

  it('should update an existing favicon', () => {
    useFavicon('https://github.com/jo0ger/vuses')
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const favicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement
    expect(favicon.href).toBe('https://github.com/jo0ger/vuses')
    useFavicon('https://en.wikipedia.org/wiki/Favicon')
    expect(favicon.href).toBe('https://en.wikipedia.org/wiki/Favicon')
  })

  it('should update the elements href when the ref href changed', () => {
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const favicon = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement
    const href = ref('https://github.com/jo0ger/vuses')
    useFavicon(href)
    expect(favicon.href).toBe('https://github.com/jo0ger/vuses')

    href.value = 'https://en.wikipedia.org/wiki/Favicon'
    expect(favicon.href).toBe('https://en.wikipedia.org/wiki/Favicon')

    href.value = 'https://github.com/jo0ger/vuses'
    expect(favicon.href).toBe('https://github.com/jo0ger/vuses')
  })
})
