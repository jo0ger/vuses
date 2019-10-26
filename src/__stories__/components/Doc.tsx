import { RenderContext } from 'vue'
import { ofType } from 'vue-tsx-support'

export interface DocProps {
  md: { default: string }
}

const ShowDocs = ({ props }: RenderContext<DocProps>) => (
  <div class="markdown-body" domPropsInnerHTML={props.md.default}></div>
)

// @ts-ignore
export default ofType<DocProps>().convert(ShowDocs)
