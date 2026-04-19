import { reactive } from 'vue'

export const store = reactive({
  items: [
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

  containers: [
    { id: 'CNT-2020-001', date: '2020-01-02', operator: '张三', location: '1-1', goods: [{ code: 'AX001', name: '插座', spec: '1X2D', unit: '个', qty: 12 }] },
    { id: 'CNT-2020-002', date: '2020-03-03', operator: '李四', location: '1-2', goods: [{ code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 11 }] },
    { id: 'CNT-2020-003', date: '2020-03-04', operator: '马六', location: '1-4', goods: [{ code: 'AX003', name: '砂轮机', spec: '1X4D', unit: '台', qty: 30 }] },
    { id: 'CNT-2020-004', date: '2020-03-05', operator: '郑七', location: '1-1', goods: [{ code: 'AX004', name: '砂轮片', spec: '1X5D', unit: '片', qty: 25 }] },
    { id: 'CNT-2020-005', date: '2020-03-06', operator: '李四', location: '1-2', goods: [{ code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 30 }] },
    { id: 'CNT-2020-006', date: '2020-03-07', operator: '郑七', location: '1-4', goods: [
      { code: 'AX007', name: '轮胎', spec: '1X8D', unit: '个', qty: 12 },
      { code: 'AX008', name: '吸尘器', spec: '1X9D', unit: '台', qty: 15 },
    ]},
    { id: 'CNT-2020-007', date: '2020-03-09', operator: '魏八', location: '1-2', goods: [{ code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 23 }] },
    { id: 'CNT-2020-008', date: '2020-03-10', operator: '李四', location: '2-1', goods: [
      { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 25 },
      { code: 'AX005', name: '角磨机', spec: '1X6D', unit: '台', qty: 12 },
    ]},
    { id: 'CNT-2020-009', date: '2020-03-12', operator: '王五', location: '1-1', goods: [{ code: 'AX008', name: '吸尘器', spec: '1X9D', unit: '台', qty: 15 }] },
    { id: 'CNT-2020-010', date: '2020-03-13', operator: '张三', location: '2-3', goods: [
      { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 12 },
      { code: 'AX007', name: '轮胎', spec: '1X8D', unit: '个', qty: 12 },
    ]},
    { id: 'CNT-2020-011', date: '2020-03-14', operator: '李四', location: '2-4', goods: [
      { code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 11 },
      { code: 'AX010', name: '冲击钻', spec: '1X11D', unit: '台', qty: 13 },
    ]},
    { id: 'CNT-2020-012', date: '2020-03-16', operator: '马六', location: '2-3', goods: [
      { code: 'AX006', name: '电焊机', spec: '1X7D', unit: '台', qty: 5 },
      { code: 'AX009', name: '扫地机', spec: '1X10D', unit: '台', qty: 10 },
    ]},
  ],

  outboundRecords: [
    { id: 1, date: '2020-02-03', person: '李四', code: 'AX001', name: '插座', spec: '1X2D', unit: '个', qty: 3 },
    { id: 2, date: '2020-03-04', person: '马六', code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 3 },
    { id: 3, date: '2020-03-05', person: '李四', code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 1 },
    { id: 4, date: '2020-03-06', person: '王五', code: 'AX003', name: '砂轮机', spec: '1X4D', unit: '台', qty: 12 },
    { id: 5, date: '2020-03-18', person: '李四', code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 12 },
    { id: 6, date: '2020-03-19', person: '马六', code: 'AX004', name: '砂轮片', spec: '1X5D', unit: '片', qty: 10 },
    { id: 7, date: '2020-03-20', person: '张三', code: 'AX002', name: '手电钻', spec: '1X3D', unit: '台', qty: 10 },
    { id: 8, date: '2020-03-21', person: '王五', code: 'AX005', name: '角磨机', spec: '1X6D', unit: '台', qty: 2 },
    { id: 9, date: '2020-03-22', person: '张三', code: 'AX003', name: '砂轮机', spec: '1X4D', unit: '台', qty: 5 },
    { id: 10, date: '2020-03-23', person: '李四', code: 'AX010', name: '冲击钻', spec: '1X11D', unit: '台', qty: 1 },
    { id: 11, date: '2020-03-24', person: '马六', code: 'AX008', name: '吸尘器', spec: '1X9D', unit: '台', qty: 5 },
    { id: 12, date: '2020-03-25', person: '张三', code: 'AX004', name: '砂轮片', spec: '1X5D', unit: '片', qty: 2 },
    { id: 13, date: '2020-03-26', person: '王五', code: 'AX008', name: '吸尘器', spec: '1X9D', unit: '台', qty: 5 },
  ],

  operators: ['张三', '李四', '王五', '马六', '郑七', '魏八'],
  locations: ['1-1', '1-2', '1-3', '1-4', '2-1', '2-2', '2-3', '2-4'],
  warningThreshold: 5,
})

export function getItemByCode(code) {
  return store.items.find(i => i.code === code)
}

export function getInboundTotal(code) {
  return store.containers.reduce((sum, c) => {
    return sum + c.goods.filter(g => g.code === code).reduce((s, g) => s + g.qty, 0)
  }, 0)
}

export function getOutboundTotal(code) {
  return store.outboundRecords.filter(r => r.code === code).reduce((s, r) => s + r.qty, 0)
}

export function getCurrentStock(code) {
  return getInboundTotal(code) - getOutboundTotal(code)
}

export function getAllInboundRecords() {
  const records = []
  store.containers.forEach(c => {
    c.goods.forEach(g => {
      records.push({
        containerId: c.id,
        date: c.date,
        operator: c.operator,
        location: c.location,
        ...g,
      })
    })
  })
  return records.sort((a, b) => a.date.localeCompare(b.date))
}

export function getTotalInboundQty() {
  return store.containers.reduce((sum, c) => sum + c.goods.reduce((s, g) => s + g.qty, 0), 0)
}

export function getTotalOutboundQty() {
  return store.outboundRecords.reduce((s, r) => s + r.qty, 0)
}

export function getTotalStock() {
  return getTotalInboundQty() - getTotalOutboundQty()
}

export function getInventorySummary() {
  return store.items.map(item => ({
    ...item,
    inbound: getInboundTotal(item.code),
    outbound: getOutboundTotal(item.code),
    stock: getCurrentStock(item.code),
    isLow: getCurrentStock(item.code) < store.warningThreshold,
  }))
}

export function addContainer(container) {
  store.containers.push(container)
}

export function addOutboundRecord(record) {
  store.outboundRecords.push({
    id: store.outboundRecords.length + 1,
    ...record,
  })
}

export function getNextContainerId() {
  const now = new Date()
  const year = now.getFullYear()
  const existing = store.containers.filter(c => c.id.startsWith(`CNT-${year}`))
  const num = existing.length + 1
  return `CNT-${year}-${String(num).padStart(3, '0')}`
}
