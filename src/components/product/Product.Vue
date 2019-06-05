<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <h1 class="mb-4 ml-4 animated fadeIn">Productos</h1>
        <div class="row">
          <div class="col-1">
            <add></add>
          </div>
          <div class="col-1">
            <spent></spent>
          </div>
        </div>
      </el-col>
      <div>
        <el-col class="tab" :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
          <el-table
            v-loading="loading"
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.createAt.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            height="600"
          >
            <el-table-column label="Codigo" prop="productCode"></el-table-column>
            <el-table-column label="Nombre" prop="name"></el-table-column>
            <el-table-column label="Cantidad" prop="quantity"></el-table-column>
            <el-table-column label="Precio" prop="price"></el-table-column>
             <el-table-column label="Fecha de creacion">
            <template slot-scope="scope">
              <p>{{(scope.row.createAt).substr(0,10)}}</p>
            </template>
          </el-table-column>

            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Escriba para buscar"/>
              </template>
              <template slot-scope="scope">
                <detail :id="scope.row.id"></detail>
                <el-button size="mini" type="danger" @click="remove(scope.row.id)">Eliminar</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import add from "./Add";
import spent from "./Spent";
import detail from "./detail";
import { EventBus } from "@/service/event-bus.js";
import { mapState } from "vuex";
export default {
  components: {
    add,
    spent,
    detail
  },
  data() {
    return {
      tableData: [],
      loading: true,
      search: ""
    };
  },
  mounted() {
    this.getAll();
    EventBus.$on("submitProduct", () => this.getAll());
  },
  methods: {
    ...mapState({
      service: state => state.services.productService
    }),
    getAll() {
      this.loading = true;
      this.service()
        .getAll()
        .then(r => (this.tableData = r.data))
        .catch(e => console.log(r.response.data))
        .finally(() => (this.loading = false));
    },
    remove(id) {
      this.$confirm("Seguro que desea eliminarlo?", "Eliminar", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        type: "warning"
      })
        .then(() => {
          this.service()
            .remove(id)
            .then(r => {
              this.$message({
                type: "success",
                message: "Producto eliminado"
              });
              this.getAll();
            })
            .catch(e => {
              this.$message({
                type: "error",
                message: e.response.data
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Operacion cancelada"
          });
        });
    }
  }
};
</script>

<style>
</style>
