<template>
  <div>
    <el-button type="primary" @click="dialogTableVisible = true; getAll()">Agregar Producto</el-button>

    <el-dialog title="Productos" :visible.sync="dialogTableVisible">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        height="600"
      >
        <el-table-column label="Nombre" prop="name"></el-table-column>
        <el-table-column label="Cantidad">
          <template slot-scope="scope">
            {{scope.row.quantity}}
          </template>
        </el-table-column>
        <el-table-column label="Marca" >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.brand }}</span>
            </template>
          </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Type to search"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="add(
              {
              name:scope.row.name,
              quantity:scope.row.quantity,
              id : scope.row.id , 
              quantity : scope.row.quantity,
              brand : scope.row.brand,
              price : scope.row.price}
              )"
            >
              <i class="el-icon-circle-plus"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { EventBus } from "@/service/event-bus.js";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      num: 1,
      dialogTableVisible: false,
      dialogFormVisible: false
    };
  },
  methods: {
    ...mapState({
      service: state => state.services.productService
    }),
    getAll() {
      this.service()
        .getAll()
        .then(r => (this.tableData = r.data.filter(x => x.quantity > 0)))
        .catch(e => console.log(r.response.data))
        .finally(() => (this.loading = false));
    },
    add(product) {
      EventBus.$emit("add", product);
    }
  }
};
</script>
