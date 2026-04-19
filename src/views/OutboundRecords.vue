<template>
  <div class="page-content">
    <div class="page-header">
      <h2>出库记录</h2>
      <el-button type="danger" @click="showAddDialog = true">
        <el-icon><Upload /></el-icon> 新增出库
      </el-button>
    </div>
    <div class="card-box">
      <div class="filter-bar">
        <el-input v-model="search" placeholder="搜索物品名称/编码/领料人" clearable style="width:260px" prefix-icon="Search" />
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width:300px" />
      </div>
      <el-table :data="filteredRecords" stripe style="width:100%">
        <el-table-column prop="id" label="序号" width="60" align="center" />
        <el-table-column prop="date" label="出库日期" width="120" />
        <el-table-column prop="person" label="领料人" width="90" />
        <el-table-column prop="code" label="物品编码" width="100" />
        <el-table-column prop="name" label="物品名称" width="120" />
        <el-table-column prop="spec" label="规格型号" width="100" />
        <el-table-column label="剩余库存" width="100" align="right">
          <template #default="{ row }">
            <span :style="{ color: stockAt(row) < 5 ? '#dc2626' : '#64748b', fontWeight: 600 }">{{ stockAt(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qty" label="出库数量" width="100" align="right">
          <template #default="{ row }">
            <span style="color:#dc2626;font-weight:700">-{{ row.qty }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="60" align="center" />
      </el-table>
      <div style="margin-top:12px;text-align:right;color:var(--text-secondary);font-size:13px">
        共 {{ filteredRecords.length }} 条记录，出库总量: <strong style="color:#dc2626">{{ filteredRecords.reduce((s, r) => s + r.qty, 0) }}</strong>
      </div>
    </div>

    <!-- Add Outbound Dialog -->
    <el-dialog v-model="showAddDialog" title="新增出库记录" width="500px" @close="resetForm">
      <el-form :model="form" label-width="90px">
        <el-form-item label="出库日期">
          <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" style="width:100%" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="领料人">
          <el-select v-model="form.person" placeholder="选择领料人" style="width:100%">
            <el-option v-for="o in store.operators" :key="o" :label="o" :value="o" />
          </el-select>
        </el-form-item>
        <el-form-item label="物品">
          <el-select v-model="form.code" placeholder="选择物品" @change="onItemSelect" style="width:100%">
            <el-option v-for="item in store.items" :key="item.code" :label="`${item.code} - ${item.name} (库存: ${getCurrentStock(item.code)})`" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="当前库存" v-if="form.code">
          <el-tag :type="selectedStock < 5 ? 'danger' : 'success'" size="large">{{ selectedStock }} {{ form.unit }}</el-tag>
        </el-form-item>
        <el-form-item label="出库数量">
          <el-input-number v-model="form.qty" :min="1" :max="selectedStock" style="width:200px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="danger" @click="submitOutbound" :disabled="!canSubmit">确认出库</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, addOutboundRecord, getCurrentStock, getItemByCode } from '../store'
import { ElMessage } from 'element-plus'

const search = ref('')
const dateRange = ref(null)
const showAddDialog = ref(false)

const filteredRecords = computed(() => {
  let list = [...store.outboundRecords].reverse()
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(r => r.name.includes(q) || r.code.toLowerCase().includes(q) || r.person.includes(q))
  }
  if (dateRange.value) {
    list = list.filter(r => r.date >= dateRange.value[0] && r.date <= dateRange.value[1])
  }
  return list
})

const stockAt = (row) => getCurrentStock(row.code)

const form = ref({ date: '', person: '', code: '', name: '', spec: '', unit: '', qty: 1 })

const selectedStock = computed(() => form.value.code ? getCurrentStock(form.value.code) : 0)

const onItemSelect = () => {
  const item = getItemByCode(form.value.code)
  if (item) { form.value.name = item.name; form.value.spec = item.spec; form.value.unit = item.unit }
  form.value.qty = 1
}

const resetForm = () => {
  form.value = { date: '', person: '', code: '', name: '', spec: '', unit: '', qty: 1 }
}

const canSubmit = computed(() => {
  const f = form.value
  return f.date && f.person && f.code && f.qty > 0 && f.qty <= selectedStock.value
})

const submitOutbound = () => {
  if (form.value.qty > selectedStock.value) {
    ElMessage.error('出库数量不能超过当前库存！')
    return
  }
  addOutboundRecord({ ...form.value })
  ElMessage.success('出库记录添加成功！')
  showAddDialog.value = false
  resetForm()
}
</script>
