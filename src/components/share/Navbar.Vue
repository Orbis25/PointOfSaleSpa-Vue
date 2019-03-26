<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <router-link tag="a" :to="{path:'home'}">Inicio</router-link>
    </el-menu-item>
    <el-menu-item class="ml-5" index="2">
      <router-link tag="a" :to="{path:'clients'}">Clientes</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link tag="a" :to="{path:'employes'}">Empleados</router-link>
    </el-menu-item>
    <el-menu-item index="5">
      <router-link tag="a" :to="{path:'suppliers'}">Supplidores</router-link>
    </el-menu-item>
    <el-menu-item index="6">
      <a href="https://www.ele.me" target="_blank">Productos</a>
    </el-menu-item>
    <el-submenu class="acciones" index="7">
      <template slot="title">Acciones</template>
      <el-menu-item index="2-1">Reportes</el-menu-item>
      <el-menu-item index="2-2">Salir</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    activeIndex: "1",
    activeIndex2: "1"
  }),
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style Scoped>
.acciones {
  margin-left: 500px;
}
</style>
