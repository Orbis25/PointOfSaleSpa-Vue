<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <i class="el-icon-bell">
        <el-badge :value="12" class="item"></el-badge>
      </i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="index,object in 3" :key="index" disabled>
        Alerta {{index}}
        <hr>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {};
</script>

<style Scoped>
</style>