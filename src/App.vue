<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <el-icon :size="24"><Box /></el-icon>
        <span>仓库管理系统</span>
      </div>
      <nav class="sidebar-nav">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item" active-class="active">
          <el-icon :size="18"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <div class="footer-info">v1.0.0</div>
      </div>
    </aside>
    <main class="main-area">
      <header class="topbar">
        <div class="breadcrumb-area">
          <span class="bc-label">{{ currentTitle }}</span>
        </div>
        <div class="topbar-right">
          <el-tag type="success" effect="dark" round>在线</el-tag>
          <el-avatar :size="32" style="background:#3b82f6">管</el-avatar>
        </div>
      </header>
      <div class="content-area">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currentTitle = computed(() => route.meta?.title || '系统首页')
const navItems = [
  { path: '/', label: '系统首页', icon: 'DataAnalysis' },
  { path: '/containers', label: '集装箱管理', icon: 'Van' },
  { path: '/inbound', label: '入库记录', icon: 'Download' },
  { path: '/outbound', label: '出库记录', icon: 'Upload' },
  { path: '/inventory', label: '物品库存', icon: 'Goods' },
]
</script>

<style>
.app-layout { display: flex; min-height: 100vh; }
.sidebar {
  width: 220px; background: var(--sidebar-bg);
  display: flex; flex-direction: column;
  position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
}
.sidebar-brand {
  display: flex; align-items: center; gap: 10px;
  padding: 20px 18px; color: #fff; font-size: 16px;
  font-weight: 700; letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.sidebar-nav { flex: 1; padding: 12px 10px; display: flex; flex-direction: column; gap: 2px; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; border-radius: 8px;
  color: rgba(255,255,255,.6); text-decoration: none;
  font-size: 14px; font-weight: 500; transition: all .15s;
}
.nav-item:hover { color: #fff; background: var(--sidebar-hover); }
.nav-item.active { color: #fff; background: var(--sidebar-active); box-shadow: inset 3px 0 0 var(--accent); }
.sidebar-footer { padding: 16px 18px; border-top: 1px solid rgba(255,255,255,.06); }
.footer-info { color: rgba(255,255,255,.3); font-size: 12px; }
.main-area { flex: 1; margin-left: 220px; display: flex; flex-direction: column; }
.topbar {
  height: 56px; background: var(--bg-card); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; position: sticky; top: 0; z-index: 50;
}
.bc-label { font-size: 15px; font-weight: 600; color: var(--text-primary); }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.content-area { flex: 1; padding: 24px; }
</style>
