import { RenderContext } from 'vue'
import { ofType } from 'vue-tsx-support'

const NewTab = ({ children }: RenderContext) => {
  if (window.location === window.parent.location) {
    return children
  }
  return (
    <p>
      This story should be{' '}
      <a href={window.location.href} target="_blank" title="Open in new tab">
        opened in a new tab
      </a>
      .
    </p>
  )
}

// @ts-ignore
export default ofType().convert(NewTab)
