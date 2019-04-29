<template>
  <div>
    <el-badge :value="12" class="item animated swing delay-2s">
      <el-button @click="dialogTableVisible = true">Agotados</el-button>
    </el-badge>
    <el-dialog title="Agotados" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" height="600">
        <el-table-column property="date" label="Producto" width="150"></el-table-column>
        <el-table-column property="name" label="Marca" width="200"></el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">Cantidad</template>
          <template slot-scope="scope">
            <el-input-number v-model="num" :min="1"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "John Smith",
          address: 0,
          num: 0
        }
      ],
      num: 0,
      dialogTableVisible: false
    };
  }
};
</script>
<style>
</style>
