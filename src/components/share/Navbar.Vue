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
      <router-link tag="a" :to="{path: 'products'}">Productos</router-link>
    </el-menu-item>
    <el-menu-item index="7">
      <alert></alert>
    </el-menu-item>

    <el-submenu class="acctions" index="8">
      <template slot="title">Acciones</template>
      <el-menu-item index="2-1">Usuario</el-menu-item>
      <el-menu-item index="2-2">Ventas</el-menu-item>
      <el-menu-item index="2-3">Facturas</el-menu-item>
      <el-menu-item index="2-4">Reportes</el-menu-item>
      <el-menu-item index="2-5">Salir</el-menu-item>
    </el-submenu>
    <el-menu-item index="9">
      <router-link tag="a" :to="{path: 'products'}">Admin</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
import alert from "./alert";
export default {
  components: {
    alert
  },
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
.acctions {
  margin-left: 500px;
}
</style>
