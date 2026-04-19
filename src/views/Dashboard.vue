<template>
  <div class="page-content">
    <div class="stat-cards">
      <div class="stat-card" v-for="s in stats" :key="s.label">
        <div class="icon-wrap" :class="s.iconClass">
          <el-icon :size="20"><component :is="s.icon" /></el-icon>
        </div>
        <div class="label">{{ s.label }}</div>
        <div class="value" :class="s.valueClass">{{ s.value }}</div>
      </div>
    </div>

    <div class="card-box">
      <div class="card-title">实时库存总览</div>
      <el-table :data="inventory" stripe style="width:100%" :row-class-name="rowClass">
        <el-table-column prop="code" label="物品编码" width="110" />
        <el-table-column prop="name" label="物品名称" width="120" />
        <el-table-column prop="spec" label="规格型号" width="110" />
        <el-table-column prop="unit" label="单位" width="70" align="center" />
        <el-table-column prop="inbound" label="累计入库" width="100" align="right">
          <template #default="{ row }">
            <span style="color:#059669;font-weight:600">+{{ row.inbound }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="outbound" label="累计出库" width="100" align="right">
          <template #default="{ row }">
            <span style="color:#dc2626;font-weight:600">-{{ row.outbound }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="当前库存" width="110" align="right">
          <template #default="{ row }">
            <span :class="{ 'low-stock': row.isLow }" style="font-weight:700">{{ row.stock }}</span>
            <el-tag v-if="row.isLow" type="danger" size="small" style="margin-left:6px">低库存</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="库存状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="row.isLow ? 'danger' : 'success'" effect="light">{{ row.isLow ? '库存不足' : '正常' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card-box">
      <div class="card-title">最近出库记录</div>
      <el-table :data="recentOutbound" stripe style="width:100%">
        <el-table-column prop="date" label="出库日期" width="120" />
        <el-table-column prop="person" label="领料人" width="100" />
        <el-table-column prop="code" label="物品编码" width="110" />
        <el-table-column prop="name" label="物品名称" width="120" />
        <el-table-column prop="qty" label="出库数量" width="100" align="right">
          <template #default="{ row }">
            <span style="color:#dc2626;font-weight:600">{{ row.qty }} {{ row.unit }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, getInventorySummary, getTotalInboundQty, getTotalOutboundQty, getTotalStock } from '../store'

const inventory = computed(() => getInventorySummary())
const recentOutbound = computed(() => [...store.outboundRecords].reverse().slice(0, 5))

const stats = computed(() => [
  { label: '物品种类', value: store.items.length, icon: 'Goods', iconClass: 'blue', valueClass: 'accent' },
  { label: '集装箱批次', value: store.containers.length, icon: 'Van', iconClass: 'purple', valueClass: '' },
  { label: '累计入库', value: getTotalInboundQty(), icon: 'Download', iconClass: 'green', valueClass: 'success' },
  { label: '累计出库', value: getTotalOutboundQty(), icon: 'Upload', iconClass: 'orange', valueClass: 'warning' },
  { label: '当前总库存', value: getTotalStock(), icon: 'Box', iconClass: 'red', valueClass: 'danger' },
])

const rowClass = ({ row }) => row.isLow ? 'low-stock-row' : ''
</script>

<style scoped>
:deep(.low-stock-row) { background: #fef2f2 !important; }
</style>
