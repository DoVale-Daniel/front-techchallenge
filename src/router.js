import Vue from 'vue'
import Router from 'vue-router'
import PageRegisterTransportUnit from './views/PageRegisterTransportUnit.vue'
import PageRegisterInvoice from './views/PageRegisterInvoice.vue'
import PageListTransportUnits from './views/PageListTransportUnits.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lista de Pacote',
      component: PageListTransportUnits,
    },
    {
      path: '/register-transport-unit',
      name: 'Cadastrar Pacote',
      component: PageRegisterTransportUnit,
    },
    {
      path: '/register-invoice',
      name: 'Cadastrar Nota Fiscal',
      component: PageRegisterInvoice,
    }
  ]
})
