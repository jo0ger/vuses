import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import 'vue-tsx-support/enable-check'
import 'github-markdown-css'
import 'prismjs/themes/prism.css'
import './markdown.css'

setOptions({
  sortStoriesByKind: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  sidebarAnimations: false,
})

Vue.use(CompositionApi)

const loadStories = () => {
  const req = require.context('../src/', true, /.*\.(stories|story)\.(js|jsx|ts|tsx)?$/)
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
