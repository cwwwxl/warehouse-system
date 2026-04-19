<template>
  <div>
    <div class="page-header"><h2>出库记录</h2></div>
    <div class="card-box">
      <div class="filter-bar">
        <el-input v-model="search" placeholder="搜索物品名称/编码/领料人/集装箱号" clearable style="width:300px" prefix-icon="Search" />
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始" end-placeholder="结束" value-format="YYYY-MM-DD" style="width:280px" />
      </div>
      <el-table :data="filteredLogs" stripe>
        <el-table-column type="index" label="#" width="50" align="center" />
        <el-table-column prop="containerId" label="集装箱编号" width="155" />
        <el-table-column prop="date" label="出库日期" width="110" />
        <el-table-column prop="code" label="物品编码" width="95" />
        <el-table-column prop="name" label="物品名称" width="100" />
        <el-table-column prop="qty" label="出库数量" width="90" align="right">
          <template #default="{ row }"><span style="color:#dc2626;font-weight:700">-{{ row.qty }}</span></template>
        </el-table-column>
        <el-table-column prop="operator" label="领料人" width="80" />
        <el-table-column prop="remark" label="备注" min-width="100" />
      </el-table>
      <div style="margin-top:12px;text-align:right;color:var(--text-secondary);font-size:13px">
        共 {{ filteredLogs.length }} 条记录，出库总量: <strong style="color:#dc2626">{{ filteredLogs.reduce((s, r) => s + r.qty, 0) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAllLogs } from '../store'

const search = ref('')
const dateRange = ref(null)

const allOutLogs = computed(() => getAllLogs().filter(l => l.type === 'out'))

const filteredLogs = computed(() => {
  let list = allOutLogs.value
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(r => r.name.includes(q) || r.code.toLowerCase().includes(q) || r.operator.includes(q) || r.containerId.toLowerCase().includes(q))
  }
  if (dateRange.value) {
    list = list.filter(r => r.date >= dateRange.value[0] && r.date <= dateRange.value[1])
  }
  return list
})
</script>
