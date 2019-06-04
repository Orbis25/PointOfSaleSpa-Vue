<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <h1 class="mb-4 ml-4 animated fadeIn">Suplidores</h1>
        <add></add>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <el-table
          v-loading="loading"
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          height="600"
        >
          <el-table-column label="Codigo" prop="supplierCode"></el-table-column>
          <el-table-column label="Nombre" prop="name"></el-table-column>
          <el-table-column label="Fecha de creacion">
              <template slot-scope="scope">
              <p>{{(scope.row.createdAt).substr(0,10)}}</p>
            </template>
          </el-table-column>
          <el-table-column label="Compañia" prop="companyName"></el-table-column>

          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Escriba para buscar"/>
            </template>
            <template slot-scope="scope">
              <detail :id="scope.row.id"></detail>
              <el-button
                size="mini"
                type="danger"
                @click="remove(scope.row.id)"
              >Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "@/service/event-bus.js";
import add from "./add";
import detail from "./detail";
export default {
  components: {
    add,
    detail
  },
  data() {
    return {
      tableData: [],
      search: "",
      loading: true
    };
  },
  mounted() {
    this.getAll();
    EventBus.$on("submitSupplier", () => this.getAll());
  },
  methods: {
    ...mapState({
      services: state => state.services.supplierService
    }),
    getAll() {
      this.loading = true;
      this.services()
        .getAll()
        .then(r => (this.tableData = r.data))
        .catch(e => console.log(e))
        .finally(() => (this.loading = false));
    },
    remove(id) {
      this.$confirm("Seguro que desea eliminarlo?", "Eliminar", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        type: "warning"
      })
        .then(() => {
          this.services()
            .remove(id)
            .then(r => {
              this.$message({
                type: "success",
                message: "Suplidor eliminado"
              });
              this.getAll()
            })
            .catch(r => {
              this.$message({
                type: "error",
                message: r.response.data
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
