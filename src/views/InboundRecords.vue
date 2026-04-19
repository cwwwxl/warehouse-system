<template>
  <div class="page-content">
    <div class="page-header">
      <h2>入库记录</h2>
    </div>
    <div class="card-box">
      <div class="filter-bar">
        <el-input v-model="search" placeholder="搜索物品名称/编码/操作人" clearable style="width:260px" prefix-icon="Search" />
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width:300px" />
        <el-select v-model="filterContainer" placeholder="集装箱批次" clearable style="width:200px">
          <el-option v-for="c in store.containers" :key="c.id" :label="c.id" :value="c.id" />
        </el-select>
      </div>
      <el-table :data="filteredRecords" stripe style="width:100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="containerId" label="集装箱批次" width="160" />
        <el-table-column prop="date" label="入库日期" width="120" />
        <el-table-column prop="operator" label="操作人" width="90" />
        <el-table-column prop="code" label="物品编码" width="100" />
        <el-table-column prop="name" label="物品名称" width="120" />
        <el-table-column prop="spec" label="规格型号" width="100" />
        <el-table-column prop="qty" label="入库数量" width="100" align="right">
          <template #default="{ row }">
            <span style="color:#059669;font-weight:700">+{{ row.qty }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="60" align="center" />
        <el-table-column prop="location" label="库位" width="70" align="center" />
      </el-table>
      <div style="margin-top:12px;text-align:right;color:var(--text-secondary);font-size:13px">
        共 {{ filteredRecords.length }} 条记录，入库总量: <strong style="color:#059669">{{ filteredRecords.reduce((s, r) => s + r.qty, 0) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, getAllInboundRecords } from '../store'

const search = ref('')
const dateRange = ref(null)
const filterContainer = ref('')

const filteredRecords = computed(() => {
  let list = getAllInboundRecords()
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(r => r.name.includes(q) || r.code.toLowerCase().includes(q) || r.operator.includes(q))
  }
  if (dateRange.value) {
    list = list.filter(r => r.date >= dateRange.value[0] && r.date <= dateRange.value[1])
  }
  if (filterContainer.value) {
    list = list.filter(r => r.containerId === filterContainer.value)
  }
  return list
})
</script>
