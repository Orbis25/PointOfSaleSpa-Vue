<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <h1 class="mb-4 ml-4 animated fadeIn">Ventas</h1>
        <router-link tag="el-button" :to="{path:'/sale/add'}">Nueva</router-link>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          height="600"
        >
          <el-table-column label="Codigo" prop="saleCode"></el-table-column>
          <el-table-column label="Nombre" prop="client.name"></el-table-column>
          <el-table-column label="Fecha de creacion" prop="createdAt"></el-table-column>
          <el-table-column label="Numero" prop="client.phoneNumber"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Escriba para buscar"/>
            </template>
            <template slot-scope="scope">
              <router-link :to="{path:`sale/${scope.row.id}/detail`}">
                <el-button size="mini" type="primary">ver</el-button>
              </router-link>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row);remove()"
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
export default {
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  mounted() {
    this.getAll();
    EventBus.$on("add", () => {
      this.getAll();
    })
  },
  methods: {
    ...mapState({
      service: state => state.services.saleService
    }),
    getAll() {
      this.service()
        .getAll()
        .then(r => (this.tableData = r.data))
        .catch(e => console.log(e));
    },

    remove() {
      this.$confirm("Seguro que desea eliminarla?", "Eliminar", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "venta eliminada"
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
