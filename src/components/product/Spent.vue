<template>
  <div>
    <el-badge :value="gridData.length" class="item animated swing delay-2s">
      <el-button @click="dialogTableVisible = true;">Casi Agotados</el-button>
    </el-badge>
    <el-dialog title="Agotados" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" height="600">
        <el-table-column property="name" label="Producto" width="150"></el-table-column>
        <el-table-column property="brand" label="Marca" width="200"></el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">Cantidad</template>
          <template slot-scope="scope">
            <p>{{scope.row.quantity}}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      gridData: [],
      num: 0,
      dialogTableVisible: false
    };
  },
  mounted(){
    this.spents();
  },
  methods: {
    ...mapState({
      service: state => state.services.productService
    }),
    spents(){
      this.service()
      .spents().then(r => this.gridData = r.data)
      .catch(e => console.log(e))
    }
  }
};
</script>
<style>
</style>
