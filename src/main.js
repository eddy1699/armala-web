/* Styles */
import '@/scss/main.scss'
/* Core */
import Vue from 'vue'
import Buefy from 'buefy'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
/* Router & Store */
import router from './router'
import store from './store'

/* Vue. Main component */
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
/* Fetch sample data */
store.dispatch('fetch', 'clients')

/* Default title tag */
const defaultDocumentTitle = 'Admin Travel Agency'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
  store.commit('asideMobileStateToggle', false)
  store.dispatch('asideDesktopOnlyToggle', false)

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
