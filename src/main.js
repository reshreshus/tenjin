import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/styles/main.sass';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const app = createApp(App)

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})


app.use(store).use(router).mount("#app");
