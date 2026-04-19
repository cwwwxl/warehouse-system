<template>
  <div>
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
      <div class="card-title">各集装箱库存概览</div>
      <el-table :data="store.containers" stripe>
        <el-table-column prop="id" label="集装箱编号" width="150" />
        <el-table-column prop="date" label="入库日期" width="110" />
        <el-table-column prop="operator" label="操作人" width="80" />
        <el-table-column label="物品种类" width="90" align="center">
          <template #default="{ row }">{{ row.goods.length }}</template>
        </el-table-column>
        <el-table-column label="初始总量" width="90" align="right">
          <template #default="{ row }">
            <span style="color:#059669;font-weight:600">{{ getContainerInitQty(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余库存" width="90" align="right">
          <template #default="{ row }">
            <span :style="{ fontWeight:700, color: getContainerTotalQty(row) < 5 ? '#dc2626' : '#1e293b' }">{{ getContainerTotalQty(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="货物明细" min-width="280">
          <template #default="{ row }">
            <el-tag v-for="g in row.goods" :key="g.code" size="small" :type="g.currentQty < 5 ? 'danger' : ''" style="margin:2px 4px 2px 0" effect="plain">
              {{ g.name }} {{ g.currentQty }}/{{ g.initQty }}{{ g.unit }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card-box">
      <div class="card-title">全仓库物品汇总</div>
      <el-table :data="globalInventory" stripe :row-class-name="({ row }) => row.isLow ? 'low-stock-row' : ''">
        <el-table-column prop="code" label="物品编码" width="100" />
        <el-table-column prop="name" label="物品名称" width="100" />
        <el-table-column prop="spec" label="规格" width="80" />
        <el-table-column prop="unit" label="单位" width="60" align="center" />
        <el-table-column prop="containerCount" label="所在箱数" width="90" align="center" />
        <el-table-column prop="totalInit" label="累计入库" width="90" align="right">
          <template #default="{ row }"><span style="color:#059669;font-weight:600">{{ row.totalInit }}</span></template>
        </el-table-column>
        <el-table-column prop="totalOut" label="累计出库" width="90" align="right">
          <template #default="{ row }"><span style="color:#dc2626;font-weight:600">{{ row.totalOut }}</span></template>
        </el-table-column>
        <el-table-column prop="totalCurrent" label="当前库存" width="100" align="right">
          <template #default="{ row }">
            <span :class="{ 'low-stock': row.isLow }" style="font-weight:700">{{ row.totalCurrent }}</span>
            <el-tag v-if="row.isLow" type="danger" size="small" style="margin-left:4px">低</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, getContainerTotalQty, getContainerInitQty, getGlobalInventory, getTotalStock, getTotalInit, getTotalOut } from '../store'

const globalInventory = computed(() => getGlobalInventory())
const stats = computed(() => [
  { label: '集装箱总数', value: store.containers.length, icon: 'Van', iconClass: 'blue', valueClass: 'accent' },
  { label: '物品种类', value: store.itemsMaster.length, icon: 'Goods', iconClass: 'purple', valueClass: '' },
  { label: '累计入库', value: getTotalInit(), icon: 'Download', iconClass: 'green', valueClass: 'success' },
  { label: '累计出库', value: getTotalOut(), icon: 'Upload', iconClass: 'orange', valueClass: 'warning' },
  { label: '当前总库存', value: getTotalStock(), icon: 'Box', iconClass: 'red', valueClass: 'danger' },
])
</script>

<style scoped>
:deep(.low-stock-row) { background: #fef2f2 !important; }
</style>
