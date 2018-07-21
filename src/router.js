import Vue from 'vue'
import Router from 'vue-router'
import PageTransportUnit from './views/PageRegisterTransportUnit.vue'
import PageRegisterInvoice from './views/PageRegisterInvoice.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cadastrar Entregas',
      component: PageTransportUnit,
    },
    {
      path: '/register-invoice',
      name: 'Cadastrar Nota Fiscal',
      component: PageRegisterInvoice,
    }
  ]
})
