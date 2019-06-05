<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <h1 class="mb-4 ml-4 animated fadeIn">Ventas</h1>
        <router-link tag="el-button" :to="{path:'/sale/add'}" v-show="role != 1">Nueva</router-link>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <el-table
          :data="tableData.filter(data => !search || data.client.name.toLowerCase().includes(search.toLowerCase()) || data.createdAt.toLowerCase().includes(search.toLowerCase())) "
          style="width: 100%"
          height="600"
        >
          <el-table-column label="Codigo" prop="saleCode"></el-table-column>
          <el-table-column label="Nombre" prop="client.name"></el-table-column>
          <el-table-column label="Fecha de creacion">
           <template slot-scope="scope">
              <p>{{(scope.row.createdAt).substr(0,10)}}</p>
            </template>
          </el-table-column>
          <el-table-column label="Numero" prop="client.phoneNumber"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Escriba para buscar"/>
            </template>
            <template slot-scope="scope">
              <router-link :to="{path:`sale/${scope.row.id}/detail`}">
                <el-button size="mini" type="primary">ver</el-button>
              </router-link>
              <el-button size="mini" type="danger" @click="remove(scope.row.id)">Eliminar</el-button>
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
    });
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

    remove(id) {
      this.$confirm("Seguro que desea eliminarla?", "Eliminar", {
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
                message: "venta eliminada"
              });
              this.getAll();
            })
            .catch(e => {
              this.$message({
                type: "error",
                message: "Lo sentimos no se ha podido eliminar la venta"
              });
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Operacion cancelada"
          });
        });
    }
  },
  computed: {
    role() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.userData.role;
    },
    dateConverter(date){
      return date.s
    }
  }
};
</script>

<style>
</style>
