import { reactive, computed } from 'vue'

export const store = reactive({
  // 集装箱列表：每个集装箱有自己的库存
  containers: [
    {
      id: 'CNT-2020-001', date: '2020-01-02', operator: '张三', status: '在库',
      goods: [
        { code: 'AX001', name: '插座', spec: '1X2D', unit: '个', initQty: 12, currentQty: 9 },
      ],
      logs: [
        { type: 'in', date: '2020-01-02', code: 'AX001', name: '插座', qty: 12, operator: '张三', remark: '初始入库' },
        { type: 'out', date: '2020-02-03', code: 'AX001', name: '插座', qty: 3, operator: '李四', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-002', date: '2020-03-03', operator: '李四', status: '在库',
      goods: [
        { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', initQty: 11, currentQty: 7 },
      ],
      logs: [
        { type: 'in', date: '2020-03-03', code: 'AX002', name: '手电钻', qty: 11, operator: '李四', remark: '初始入库' },
        { type: 'out', date: '2020-03-04', code: 'AX002', name: '手电钻', qty: 3, operator: '马六', remark: '' },
        { type: 'out', date: '2020-03-05', code: 'AX002', name: '手电钻', qty: 1, operator: '李四', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-003', date: '2020-03-04', operator: '马六', status: '在库',
      goods: [
        { code: 'AX003', name: '砂轮机', spec: '1X4D', unit: '台', initQty: 30, currentQty: 13 },
      ],
      logs: [
        { type: 'in', date: '2020-03-04', code: 'AX003', name: '砂轮机', qty: 30, operator: '马六', remark: '初始入库' },
        { type: 'out', date: '2020-03-06', code: 'AX003', name: '砂轮机', qty: 12, operator: '王五', remark: '' },
        { type: 'out', date: '2020-03-22', code: 'AX003', name: '砂轮机', qty: 5, operator: '张三', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-004', date: '2020-03-05', operator: '郑七', status: '在库',
      goods: [
        { code: 'AX004', name: '砂轮片', spec: '1X5D', unit: '片', initQty: 25, currentQty: 13 },
      ],
      logs: [
        { type: 'in', date: '2020-03-05', code: 'AX004', name: '砂轮片', qty: 25, operator: '郑七', remark: '初始入库' },
        { type: 'out', date: '2020-03-19', code: 'AX004', name: '砂轮片', qty: 10, operator: '马六', remark: '' },
        { type: 'out', date: '2020-03-25', code: 'AX004', name: '砂轮片', qty: 2, operator: '张三', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-005', date: '2020-03-06', operator: '李四', status: '在库',
      goods: [
        { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', initQty: 30, currentQty: 18 },
      ],
      logs: [
        { type: 'in', date: '2020-03-06', code: 'AX002', name: '手电钻', qty: 30, operator: '李四', remark: '初始入库' },
        { type: 'out', date: '2020-03-18', code: 'AX002', name: '手电钻', qty: 12, operator: '李四', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-006', date: '2020-03-07', operator: '郑七', status: '在库',
      goods: [
        { code: 'AX007', name: '轮胎', spec: '1X8D', unit: '个', initQty: 12, currentQty: 12 },
        { code: 'AX008', name: '吸尘器', spec: '1X9D', unit: '台', initQty: 15, currentQty: 10 },
      ],
      logs: [
        { type: 'in', date: '2020-03-07', code: 'AX007', name: '轮胎', qty: 12, operator: '郑七', remark: '初始入库' },
        { type: 'in', date: '2020-03-07', code: 'AX008', name: '吸尘器', qty: 15, operator: '郑七', remark: '初始入库' },
        { type: 'out', date: '2020-03-24', code: 'AX008', name: '吸尘器', qty: 5, operator: '马六', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-007', date: '2020-03-09', operator: '魏八', status: '在库',
      goods: [
        { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', initQty: 23, currentQty: 13 },
      ],
      logs: [
        { type: 'in', date: '2020-03-09', code: 'AX002', name: '手电钻', qty: 23, operator: '魏八', remark: '初始入库' },
        { type: 'out', date: '2020-03-20', code: 'AX002', name: '手电钻', qty: 10, operator: '张三', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-008', date: '2020-03-10', operator: '李四', status: '在库',
      goods: [
        { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', initQty: 25, currentQty: 25 },
        { code: 'AX005', name: '角磨机', spec: '1X6D', unit: '台', initQty: 12, currentQty: 10 },
      ],
      logs: [
        { type: 'in', date: '2020-03-10', code: 'AX002', name: '手电钻', qty: 25, operator: '李四', remark: '初始入库' },
        { type: 'in', date: '2020-03-10', code: 'AX005', name: '角磨机', qty: 12, operator: '李四', remark: '初始入库' },
        { type: 'out', date: '2020-03-21', code: 'AX005', name: '角磨机', qty: 2, operator: '王五', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-009', date: '2020-03-12', operator: '王五', status: '在库',
      goods: [
        { code: 'AX008', name: '吸尘器', spec: '1X9D', unit: '台', initQty: 15, currentQty: 10 },
      ],
      logs: [
        { type: 'in', date: '2020-03-12', code: 'AX008', name: '吸尘器', qty: 15, operator: '王五', remark: '初始入库' },
        { type: 'out', date: '2020-03-26', code: 'AX008', name: '吸尘器', qty: 5, operator: '王五', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-010', date: '2020-03-13', operator: '张三', status: '在库',
      goods: [
        { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', initQty: 12, currentQty: 12 },
        { code: 'AX007', name: '轮胎', spec: '1X8D', unit: '个', initQty: 12, currentQty: 12 },
      ],
      logs: [
        { type: 'in', date: '2020-03-13', code: 'AX002', name: '手电钻', qty: 12, operator: '张三', remark: '初始入库' },
        { type: 'in', date: '2020-03-13', code: 'AX007', name: '轮胎', qty: 12, operator: '张三', remark: '初始入库' },
      ]
    },
    {
      id: 'CNT-2020-011', date: '2020-03-14', operator: '李四', status: '在库',
      goods: [
        { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', initQty: 11, currentQty: 11 },
        { code: 'AX010', name: '冲击钻', spec: '1X11D', unit: '台', initQty: 13, currentQty: 12 },
      ],
      logs: [
        { type: 'in', date: '2020-03-14', code: 'AX002', name: '手电钻', qty: 11, operator: '李四', remark: '初始入库' },
        { type: 'in', date: '2020-03-14', code: 'AX010', name: '冲击钻', qty: 13, operator: '李四', remark: '初始入库' },
        { type: 'out', date: '2020-03-23', code: 'AX010', name: '冲击钻', qty: 1, operator: '李四', remark: '' },
      ]
    },
    {
      id: 'CNT-2020-012', date: '2020-03-16', operator: '马六', status: '在库',
      goods: [
        { code: 'AX006', name: '电焊机', spec: '1X7D', unit: '台', initQty: 5, currentQty: 5 },
        { code: 'AX009', name: '扫地机', spec: '1X10D', unit: '台', initQty: 10, currentQty: 10 },
      ],
      logs: [
        { type: 'in', date: '2020-03-16', code: 'AX006', name: '电焊机', qty: 5, operator: '马六', remark: '初始入库' },
        { type: 'in', date: '2020-03-16', code: 'AX009', name: '扫地机', qty: 10, operator: '马六', remark: '初始入库' },
      ]
    },
  ],

  // 物品主数据
  itemsMaster: [
    { code: 'AX001', name: '插座', spec: '1X2D', unit: '个' },
    { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台' },
    { code: 'AX003', name: '砂轮机', spec: '1X4D', unit: '台' },
    { code: 'AX004', name: '砂轮片', spec: '1X5D', unit: '片' },
    { code: 'AX005', name: '角磨机', spec: '1X6D', unit: '台' },
    { code: 'AX006', name: '电焊机', spec: '1X7D', unit: '台' },
    { code: 'AX007', name: '轮胎', spec: '1X8D', unit: '个' },
    { code: 'AX008', name: '吸尘器', spec: '1X9D', unit: '台' },
    { code: 'AX009', name: '扫地机', spec: '1X10D', unit: '台' },
    { code: 'AX010', name: '冲击钻', spec: '1X11D', unit: '台' },
  ],

  operators: ['张三', '李四', '王五', '马六', '郑七', '魏八'],
  warningThreshold: 5,
})

// 获取物品主数据
export function getItemMaster(code) {
  return store.itemsMaster.find(i => i.code === code)
}

// 获取某个集装箱的当前总库存量
export function getContainerTotalQty(container) {
  return container.goods.reduce((s, g) => s + g.currentQty, 0)
}

// 获取某个集装箱的初始总入库量
export function getContainerInitQty(container) {
  return container.goods.reduce((s, g) => s + g.initQty, 0)
}

// 全局统计：按物品汇总（跨所有集装箱）
export function getGlobalInventory() {
  const map = {}
  store.containers.forEach(c => {
    c.goods.forEach(g => {
      if (!map[g.code]) {
        map[g.code] = { code: g.code, name: g.name, spec: g.spec, unit: g.unit, totalInit: 0, totalCurrent: 0, containerCount: 0 }
      }
      map[g.code].totalInit += g.initQty
      map[g.code].totalCurrent += g.currentQty
      if (g.currentQty > 0) map[g.code].containerCount++
    })
  })
  return Object.values(map).map(item => ({
    ...item,
    totalOut: item.totalInit - item.totalCurrent,
    isLow: item.totalCurrent < store.warningThreshold,
  }))
}

// 全仓库总库存
export function getTotalStock() {
  return store.containers.reduce((s, c) => s + getContainerTotalQty(c), 0)
}

// 全仓库总入库
export function getTotalInit() {
  return store.containers.reduce((s, c) => s + getContainerInitQty(c), 0)
}

// 全仓库总出库
export function getTotalOut() {
  return getTotalInit() - getTotalStock()
}

// 所有出入库日志（扁平化）
export function getAllLogs() {
  const logs = []
  store.containers.forEach(c => {
    c.logs.forEach(log => {
      logs.push({ ...log, containerId: c.id })
    })
  })
  return logs.sort((a, b) => b.date.localeCompare(a.date))
}

// 对某个集装箱执行出库
export function doOutbound(containerId, code, qty, operator, remark) {
  const container = store.containers.find(c => c.id === containerId)
  if (!container) return false
  const good = container.goods.find(g => g.code === code)
  if (!good || good.currentQty < qty) return false
  good.currentQty -= qty
  container.logs.push({
    type: 'out',
    date: new Date().toISOString().slice(0, 10),
    code, name: good.name, qty, operator, remark: remark || '',
  })
  return true
}

// 对某个集装箱追加入库
export function doInbound(containerId, code, qty, operator, remark) {
  const container = store.containers.find(c => c.id === containerId)
  if (!container) return false
  const good = container.goods.find(g => g.code === code)
  if (good) {
    good.currentQty += qty
    good.initQty += qty
  } else {
    const master = getItemMaster(code)
    if (!master) return false
    container.goods.push({ ...master, initQty: qty, currentQty: qty })
  }
  container.logs.push({
    type: 'in',
    date: new Date().toISOString().slice(0, 10),
    code, name: getItemMaster(code)?.name || '', qty, operator, remark: remark || '',
  })
  return true
}

// 新增集装箱
export function addContainer(data) {
  const container = {
    id: data.id,
    date: data.date,
    operator: data.operator,
    status: '在库',
    goods: data.goods.map(g => ({ ...g, initQty: g.qty, currentQty: g.qty })),
    logs: data.goods.map(g => ({
      type: 'in', date: data.date, code: g.code, name: g.name, qty: g.qty, operator: data.operator, remark: '初始入库',
    })),
  }
  store.containers.push(container)
  return container
}

// 生成下一个集装箱编号
export function getNextContainerId() {
  const year = new Date().getFullYear()
  const existing = store.containers.filter(c => c.id.includes(`${year}`))
  return `CNT-${year}-${String(existing.length + 1).padStart(3, '0')}`
}
