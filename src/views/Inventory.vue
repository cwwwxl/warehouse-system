<template>
  <div>
    <div class="page-header"><h2>物品库存</h2></div>
    <div class="stat-cards">
      <div class="stat-card">
        <div class="icon-wrap blue"><el-icon :size="20"><Goods /></el-icon></div>
        <div class="label">物品种类</div>
        <div class="value accent">{{ store.itemsMaster.length }}</div>
      </div>
      <div class="stat-card">
        <div class="icon-wrap green"><el-icon :size="20"><Download /></el-icon></div>
        <div class="label">累计入库总量</div>
        <div class="value success">{{ totalIn }}</div>
      </div>
      <div class="stat-card">
        <div class="icon-wrap orange"><el-icon :size="20"><Upload /></el-icon></div>
        <div class="label">累计出库总量</div>
        <div class="value warning">{{ totalOut }}</div>
      </div>
      <div class="stat-card">
        <div class="icon-wrap red"><el-icon :size="20"><Warning /></el-icon></div>
        <div class="label">低库存预警</div>
        <div class="value danger">{{ lowCount }}</div>
      </div>
    </div>
    <div class="card-box">
      <div class="filter-bar">
        <el-input v-model="search" placeholder="搜索物品名称/编码" clearable style="width:220px" prefix-icon="Search" />
        <el-checkbox v-model="showLowOnly" label="仅显示低库存" />
      </div>
      <el-table :data="filtered" stripe :row-class-name="({ row }) => row.isLow ? 'low-stock-row' : ''">
        <el-table-column type="index" label="#" width="50" align="center" />
        <el-table-column prop="code" label="物品编码" width="100" />
        <el-table-column prop="name" label="物品名称" width="100" />
        <el-table-column prop="spec" label="规格型号" width="90" />
        <el-table-column prop="unit" label="单位" width="60" align="center" />
        <el-table-column prop="containerCount" label="所在箱数" width="85" align="center">
          <template #default="{ row }"><el-tag size="small">{{ row.containerCount }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="totalInit" label="累计入库" width="90" align="right">
          <template #default="{ row }"><span style="color:#059669;font-weight:600">{{ row.totalInit }}</span></template>
        </el-table-column>
        <el-table-column prop="totalOut" label="累计出库" width="90" align="right">
          <template #default="{ row }"><span style="color:#dc2626;font-weight:600">{{ row.totalOut }}</span></template>
        </el-table-column>
        <el-table-column prop="totalCurrent" label="当前库存" width="100" align="right" sortable>
          <template #default="{ row }">
            <span :class="{ 'low-stock': row.isLow }" style="font-weight:700;font-size:15px">{{ row.totalCurrent }}</span>
            <el-tag v-if="row.isLow" type="danger" size="small" style="margin-left:4px">预警</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="库存率" width="110" align="center">
          <template #default="{ row }">
            <el-progress :percentage="row.totalInit > 0 ? Math.round(row.totalCurrent / row.totalInit * 100) : 0" :color="row.isLow ? '#ef4444' : '#10b981'" :stroke-width="7" style="width:80px;display:inline-block" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, getGlobalInventory, getTotalInit, getTotalOut } from '../store'

const search = ref('')
const showLowOnly = ref(false)

const inventory = computed(() => getGlobalInventory())
const totalIn = computed(() => getTotalInit())
const totalOut = computed(() => getTotalOut())
const lowCount = computed(() => inventory.value.filter(i => i.isLow).length)

const filtered = computed(() => {
  let list = inventory.value
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(i => i.name.includes(q) || i.code.toLowerCase().includes(q))
  }
  if (showLowOnly.value) list = list.filter(i => i.isLow)
  return list
})
</script>

<style scoped>
:deep(.low-stock-row) { background: #fef2f2 !important; }
</style>
