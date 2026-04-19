import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ContainerList from '../views/ContainerList.vue'
import InboundRecords from '../views/InboundRecords.vue'
import OutboundRecords from '../views/OutboundRecords.vue'
import Inventory from '../views/Inventory.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard, meta: { title: '系统首页' } },
  { path: '/containers', name: 'containers', component: ContainerList, meta: { title: '集装箱管理' } },
  { path: '/inbound', name: 'inbound', component: InboundRecords, meta: { title: '入库记录' } },
  { path: '/outbound', name: 'outbound', component: OutboundRecords, meta: { title: '出库记录' } },
  { path: '/inventory', name: 'inventory', component: Inventory, meta: { title: '物品库存' } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
