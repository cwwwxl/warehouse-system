<template>
  <div class="page-content">
    <div class="page-header">
      <h2>集装箱管理</h2>
      <el-button type="primary" @click="showAddDialog = true">
        <el-icon><Plus /></el-icon> 新增集装箱入库
      </el-button>
    </div>

    <div class="card-box">
      <div class="filter-bar">
        <el-input v-model="search" placeholder="搜索批次号/操作人" clearable style="width:240px" prefix-icon="Search" />
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width:300px" />
      </div>
      <el-table :data="filteredContainers" stripe style="width:100%">
        <el-table-column prop="id" label="集装箱批次号" width="160" />
        <el-table-column prop="date" label="入库日期" width="120" />
        <el-table-column prop="operator" label="操作人" width="100" />
        <el-table-column prop="location" label="库位" width="80" align="center" />
        <el-table-column label="货物种类" width="100" align="center">
          <template #default="{ row }">
            <el-tag>{{ row.goods.length }} 种</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="货物总量" width="100" align="right">
          <template #default="{ row }">
            <span style="font-weight:700;color:#059669">{{ row.goods.reduce((s, g) => s + g.qty, 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="货物明细" min-width="250">
          <template #default="{ row }">
            <el-tag v-for="g in row.goods" :key="g.code" size="small" style="margin:2px 4px 2px 0" effect="plain">
              {{ g.name }} x{{ g.qty }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="viewDetail(row)">
              <el-icon><View /></el-icon> 详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Detail Dialog -->
    <el-dialog v-model="showDetail" :title="`集装箱详情 - ${detailContainer?.id || ''}`" width="600px">
      <template v-if="detailContainer">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="批次号">{{ detailContainer.id }}</el-descriptions-item>
          <el-descriptions-item label="入库日期">{{ detailContainer.date }}</el-descriptions-item>
          <el-descriptions-item label="操作人">{{ detailContainer.operator }}</el-descriptions-item>
          <el-descriptions-item label="库位">{{ detailContainer.location }}</el-descriptions-item>
        </el-descriptions>
        <div style="margin-top:16px;font-weight:600;margin-bottom:8px">货物清单</div>
        <el-table :data="detailContainer.goods" stripe border>
          <el-table-column prop="code" label="编码" width="100" />
          <el-table-column prop="name" label="名称" width="120" />
          <el-table-column prop="spec" label="规格" width="100" />
          <el-table-column prop="qty" label="数量" width="80" align="right">
            <template #default="{ row }">
              <span style="font-weight:700">{{ row.qty }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="60" align="center" />
        </el-table>
        <div style="margin-top:12px;text-align:right;font-weight:700;color:#059669">
          总计: {{ detailContainer.goods.reduce((s, g) => s + g.qty, 0) }} 件
        </div>
      </template>
    </el-dialog>

    <!-- Add Container Dialog -->
    <el-dialog v-model="showAddDialog" title="新增集装箱入库" width="700px" @close="resetForm">
      <el-form :model="form" label-width="100px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="批次号">
              <el-input v-model="form.id" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入库日期">
              <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" style="width:100%" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人">
              <el-select v-model="form.operator" placeholder="选择操作人" style="width:100%">
                <el-option v-for="o in store.operators" :key="o" :label="o" :value="o" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库位">
              <el-select v-model="form.location" placeholder="选择库位" style="width:100%">
                <el-option v-for="l in store.locations" :key="l" :label="l" :value="l" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="display:flex;align-items:center;justify-content:space-between;margin:12px 0 8px">
          <span style="font-weight:600">货物清单</span>
          <el-button type="primary" size="small" @click="addGoodsRow"><el-icon><Plus /></el-icon> 添加货物</el-button>
        </div>
        <el-table :data="form.goods" border style="width:100%">
          <el-table-column label="物品" min-width="160">
            <template #default="{ row }">
              <el-select v-model="row.code" placeholder="选择物品" @change="onItemSelect(row)" style="width:100%">
                <el-option v-for="item in store.items" :key="item.code" :label="`${item.code} - ${item.name}`" :value="item.code" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="100">
            <template #default="{ row }"><span>{{ row.spec }}</span></template>
          </el-table-column>
          <el-table-column label="数量" width="100">
            <template #default="{ row }">
              <el-input-number v-model="row.qty" :min="1" size="small" style="width:80px" />
            </template>
          </el-table-column>
          <el-table-column label="单位" width="60" align="center">
            <template #default="{ row }">{{ row.unit }}</template>
          </el-table-column>
          <el-table-column width="60" align="center">
            <template #default="{ $index }">
              <el-button type="danger" link size="small" @click="form.goods.splice($index, 1)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="submitContainer" :disabled="!canSubmit">确认入库</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, addContainer, getNextContainerId, getItemByCode } from '../store'
import { ElMessage } from 'element-plus'

const search = ref('')
const dateRange = ref(null)
const showDetail = ref(false)
const showAddDialog = ref(false)
const detailContainer = ref(null)

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

const viewDetail = (row) => { detailContainer.value = row; showDetail.value = true }

const form = ref({ id: '', date: '', operator: '', location: '', goods: [] })

const resetForm = () => {
  form.value = { id: getNextContainerId(), date: '', operator: '', location: '', goods: [] }
}

const addGoodsRow = () => {
  form.value.goods.push({ code: '', name: '', spec: '', unit: '', qty: 1 })
}

const onItemSelect = (row) => {
  const item = getItemByCode(row.code)
  if (item) { row.name = item.name; row.spec = item.spec; row.unit = item.unit }
}

const canSubmit = computed(() => {
  const f = form.value
  return f.date && f.operator && f.location && f.goods.length > 0 && f.goods.every(g => g.code && g.qty > 0)
})

const submitContainer = () => {
  addContainer({ ...form.value, goods: form.value.goods.map(g => ({ ...g })) })
  ElMessage.success('集装箱入库成功！')
  showAddDialog.value = false
  resetForm()
}

// Init form id
form.value.id = getNextContainerId()
</script>
