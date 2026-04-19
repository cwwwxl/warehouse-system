<template>
  <div>
    <div class="page-header">
      <h2>集装箱管理</h2>
      <el-button type="primary" @click="openAddContainer">
        <el-icon><Plus /></el-icon> 新增集装箱
      </el-button>
    </div>

    <div class="card-box">
      <div class="filter-bar">
        <el-input v-model="search" placeholder="搜索批次号/操作人" clearable style="width:220px" prefix-icon="Search" />
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始" end-placeholder="结束" value-format="YYYY-MM-DD" style="width:280px" />
      </div>
      <el-table :data="filteredContainers" stripe>
        <el-table-column prop="id" label="集装箱编号" width="155" />
        <el-table-column prop="date" label="入库日期" width="110" />
        <el-table-column prop="operator" label="操作人" width="80" />
        <el-table-column label="物品种类" width="85" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ row.goods.length }} 种</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="初始总量" width="85" align="right">
          <template #default="{ row }">
            <span style="color:#64748b">{{ getContainerInitQty(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="当前库存" width="90" align="right">
          <template #default="{ row }">
            <span :style="{ fontWeight:700, color: getContainerTotalQty(row) === 0 ? '#94a3b8' : getContainerTotalQty(row) < 5 ? '#dc2626' : '#059669' }">
              {{ getContainerTotalQty(row) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="货物概况" min-width="250">
          <template #default="{ row }">
            <el-tag v-for="g in row.goods" :key="g.code" size="small" :type="g.currentQty === 0 ? 'info' : g.currentQty < 5 ? 'danger' : 'success'" style="margin:2px 3px 2px 0" effect="light">
              {{ g.name }} {{ g.currentQty }}/{{ g.initQty }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="viewDetail(row)"><el-icon><View /></el-icon> 详情</el-button>
            <el-button type="success" link size="small" @click="openInbound(row)"><el-icon><Download /></el-icon> 入库</el-button>
            <el-button type="danger" link size="small" @click="openOutbound(row)"><el-icon><Upload /></el-icon> 出库</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 集装箱详情弹窗 -->
    <el-dialog v-model="detailVisible" :title="`集装箱详情 - ${currentContainer?.id}`" width="750px" top="5vh">
      <template v-if="currentContainer">
        <el-descriptions :column="3" border size="small" style="margin-bottom:16px">
          <el-descriptions-item label="编号">{{ currentContainer.id }}</el-descriptions-item>
          <el-descriptions-item label="入库日期">{{ currentContainer.date }}</el-descriptions-item>
          <el-descriptions-item label="操作人">{{ currentContainer.operator }}</el-descriptions-item>
        </el-descriptions>

        <div style="font-weight:600;margin-bottom:8px">箱内物品库存</div>
        <el-table :data="currentContainer.goods" stripe border size="small">
          <el-table-column prop="code" label="编码" width="90" />
          <el-table-column prop="name" label="名称" width="100" />
          <el-table-column prop="spec" label="规格" width="80" />
          <el-table-column prop="unit" label="单位" width="55" align="center" />
          <el-table-column prop="initQty" label="初始入库" width="85" align="right">
            <template #default="{ row }"><span style="color:#059669">{{ row.initQty }}</span></template>
          </el-table-column>
          <el-table-column label="已出库" width="80" align="right">
            <template #default="{ row }"><span style="color:#dc2626">{{ row.initQty - row.currentQty }}</span></template>
          </el-table-column>
          <el-table-column prop="currentQty" label="当前库存" width="90" align="right">
            <template #default="{ row }">
              <span :style="{ fontWeight:700, color: row.currentQty < 5 ? '#dc2626' : '#1e293b' }">{{ row.currentQty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="库存率" width="100">
            <template #default="{ row }">
              <el-progress :percentage="row.initQty > 0 ? Math.round(row.currentQty / row.initQty * 100) : 0" :color="row.currentQty < 5 ? '#ef4444' : '#10b981'" :stroke-width="6" />
            </template>
          </el-table-column>
        </el-table>

        <div style="font-weight:600;margin:16px 0 8px">出入库记录</div>
        <el-table :data="currentContainer.logs.slice().reverse()" stripe border size="small" max-height="250">
          <el-table-column label="类型" width="70" align="center">
            <template #default="{ row }">
              <el-tag :type="row.type === 'in' ? 'success' : 'danger'" size="small" effect="dark">{{ row.type === 'in' ? '入库' : '出库' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" width="100" />
          <el-table-column prop="code" label="编码" width="80" />
          <el-table-column prop="name" label="物品" width="90" />
          <el-table-column prop="qty" label="数量" width="70" align="right">
            <template #default="{ row }">
              <span :style="{ color: row.type === 'in' ? '#059669' : '#dc2626', fontWeight:600 }">{{ row.type === 'in' ? '+' : '-' }}{{ row.qty }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="操作人" width="80" />
          <el-table-column prop="remark" label="备注" min-width="80" />
        </el-table>
      </template>
    </el-dialog>

    <!-- 入库弹窗 -->
    <el-dialog v-model="inboundVisible" :title="`入库 - ${currentContainer?.id}`" width="480px" @close="resetInForm">
      <el-form :model="inForm" label-width="80px">
        <el-form-item label="物品">
          <el-select v-model="inForm.code" placeholder="选择物品" @change="onInItemChange" style="width:100%">
            <el-option v-for="item in store.itemsMaster" :key="item.code" :label="`${item.code} - ${item.name}`" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="inForm.qty" :min="1" style="width:180px" />
        </el-form-item>
        <el-form-item label="操作人">
          <el-select v-model="inForm.operator" style="width:100%">
            <el-option v-for="o in store.operators" :key="o" :label="o" :value="o" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="inForm.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="inboundVisible = false">取消</el-button>
        <el-button type="primary" @click="submitInbound" :disabled="!inForm.code || !inForm.operator || inForm.qty < 1">确认入库</el-button>
      </template>
    </el-dialog>

    <!-- 出库弹窗 -->
    <el-dialog v-model="outboundVisible" :title="`出库 - ${currentContainer?.id}`" width="480px" @close="resetOutForm">
      <el-form :model="outForm" label-width="80px">
        <el-form-item label="物品">
          <el-select v-model="outForm.code" placeholder="选择物品" @change="onOutItemChange" style="width:100%">
            <el-option v-for="g in currentContainer?.goods.filter(g => g.currentQty > 0)" :key="g.code" :label="`${g.code} - ${g.name} (库存: ${g.currentQty}${g.unit})`" :value="g.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="当前库存" v-if="outForm.code">
          <el-tag :type="selectedOutStock < 5 ? 'danger' : 'success'" size="large">{{ selectedOutStock }} {{ selectedOutUnit }}</el-tag>
        </el-form-item>
        <el-form-item label="出库数量">
          <el-input-number v-model="outForm.qty" :min="1" :max="selectedOutStock" style="width:180px" />
        </el-form-item>
        <el-form-item label="领料人">
          <el-select v-model="outForm.operator" style="width:100%">
            <el-option v-for="o in store.operators" :key="o" :label="o" :value="o" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="outForm.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="outboundVisible = false">取消</el-button>
        <el-button type="danger" @click="submitOutbound" :disabled="!outForm.code || !outForm.operator || outForm.qty < 1 || outForm.qty > selectedOutStock">确认出库</el-button>
      </template>
    </el-dialog>

    <!-- 新增集装箱弹窗 -->
    <el-dialog v-model="addVisible" title="新增集装箱" width="680px" @close="resetAddForm">
      <el-form :model="addForm" label-width="90px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="批次号"><el-input v-model="addForm.id" disabled /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入库日期">
              <el-date-picker v-model="addForm.date" type="date" value-format="YYYY-MM-DD" style="width:100%" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人">
              <el-select v-model="addForm.operator" style="width:100%">
                <el-option v-for="o in store.operators" :key="o" :label="o" :value="o" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0">
          <span style="font-weight:600">箱内货物</span>
          <el-button type="primary" size="small" @click="addForm.goods.push({ code:'', name:'', spec:'', unit:'', qty:1 })"><el-icon><Plus /></el-icon> 添加</el-button>
        </div>
        <el-table :data="addForm.goods" border size="small">
          <el-table-column label="物品" min-width="170">
            <template #default="{ row }">
              <el-select v-model="row.code" placeholder="选择物品" @change="onAddItemChange(row)" style="width:100%">
                <el-option v-for="item in store.itemsMaster" :key="item.code" :label="`${item.code} - ${item.name}`" :value="item.code" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="90"><template #default="{ row }">{{ row.spec }}</template></el-table-column>
          <el-table-column label="数量" width="100">
            <template #default="{ row }"><el-input-number v-model="row.qty" :min="1" size="small" style="width:80px" /></template>
          </el-table-column>
          <el-table-column label="单位" width="55" align="center"><template #default="{ row }">{{ row.unit }}</template></el-table-column>
          <el-table-column width="50" align="center">
            <template #default="{ $index }">
              <el-button type="danger" link size="small" @click="addForm.goods.splice($index, 1)"><el-icon><Delete /></el-icon></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <template #footer>
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAdd" :disabled="!canAdd">确认新增</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, getContainerTotalQty, getContainerInitQty, doOutbound, doInbound, addContainer, getNextContainerId, getItemMaster } from '../store'
import { ElMessage } from 'element-plus'

const search = ref('')
const dateRange = ref(null)
const currentContainer = ref(null)
const detailVisible = ref(false)
const inboundVisible = ref(false)
const outboundVisible = ref(false)
const addVisible = ref(false)

const filteredContainers = computed(() => {
  let list = [...store.containers].reverse()
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(c => c.id.toLowerCase().includes(q) || c.operator.includes(q))
  }
  if (dateRange.value) {
    list = list.filter(c => c.date >= dateRange.value[0] && c.date <= dateRange.value[1])
  }
  return list
})

const viewDetail = (row) => { currentContainer.value = row; detailVisible.value = true }
const openInbound = (row) => { currentContainer.value = row; inboundVisible.value = true }
const openOutbound = (row) => { currentContainer.value = row; outboundVisible.value = true }

// 入库表单
const inForm = ref({ code: '', qty: 1, operator: '', remark: '' })
const resetInForm = () => { inForm.value = { code: '', qty: 1, operator: '', remark: '' } }
const onInItemChange = () => { inForm.value.qty = 1 }
const submitInbound = () => {
  const ok = doInbound(currentContainer.value.id, inForm.value.code, inForm.value.qty, inForm.value.operator, inForm.value.remark)
  if (ok) { ElMessage.success('入库成功'); inboundVisible.value = false; resetInForm() }
  else ElMessage.error('入库失败')
}

// 出库表单
const outForm = ref({ code: '', qty: 1, operator: '', remark: '' })
const resetOutForm = () => { outForm.value = { code: '', qty: 1, operator: '', remark: '' } }
const selectedOutStock = computed(() => {
  if (!outForm.value.code || !currentContainer.value) return 0
  const g = currentContainer.value.goods.find(g => g.code === outForm.value.code)
  return g ? g.currentQty : 0
})
const selectedOutUnit = computed(() => {
  if (!outForm.value.code || !currentContainer.value) return ''
  const g = currentContainer.value.goods.find(g => g.code === outForm.value.code)
  return g ? g.unit : ''
})
const onOutItemChange = () => { outForm.value.qty = 1 }
const submitOutbound = () => {
  const ok = doOutbound(currentContainer.value.id, outForm.value.code, outForm.value.qty, outForm.value.operator, outForm.value.remark)
  if (ok) { ElMessage.success('出库成功'); outboundVisible.value = false; resetOutForm() }
  else ElMessage.error('出库失败，库存不足')
}

// 新增集装箱
const addForm = ref({ id: getNextContainerId(), date: '', operator: '', goods: [] })
const resetAddForm = () => { addForm.value = { id: getNextContainerId(), date: '', operator: '', goods: [] } }
const openAddContainer = () => { resetAddForm(); addVisible.value = true }
const onAddItemChange = (row) => {
  const m = getItemMaster(row.code)
  if (m) { row.name = m.name; row.spec = m.spec; row.unit = m.unit }
}
const canAdd = computed(() => {
  const f = addForm.value
  return f.date && f.operator && f.goods.length > 0 && f.goods.every(g => g.code && g.qty > 0)
})
const submitAdd = () => {
  addContainer(addForm.value)
  ElMessage.success('集装箱新增成功')
  addVisible.value = false
}
</script>
