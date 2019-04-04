<template>
  <el-row justify="center" :gutter="24">
    <el-col v-for="(i,o) in title" :key="o" :span="6">
      <el-card shadow="hover" class="animated rollIn">
        <div class="text-center">
          <img src="@/assets/logo.png" alt>
          <br />{{i.name}} <br/> {{i.quantity}}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      title: [
        { name: "Empleados", quantity: 1 },
        { name: "Clientes", quantity: 1 },
        { name: "Productos", quantity: 1 },
        { name: "Suplidores", quantity: 1 }
      ]
    };
  }
};
</script>

<style Scoped>

</style>
