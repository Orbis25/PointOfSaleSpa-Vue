<template>
  <el-row :gutter="24">
    <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
      <h1 class="animated fadeIn">Clientes</h1>

      <div class="row">
        <div class="col">
          <add></add>
        </div>
      </div>
    </el-col>

    <div>
      <el-col class="tab" :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <el-table
          v-loading="loading"
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.createdAt.toLowerCase().includes(search.toLowerCase())) "
          style="width: 100%"
          id="table-client"
          height="600"
        >
          <el-table-column label="Codigo" prop="clientCode"></el-table-column>
          <el-table-column label="Nombre" prop="name"></el-table-column>
          <el-table-column label="Apellidos" prop="lastName"></el-table-column>
          <el-table-column label="Fecha de creacion">
            <template slot-scope="scope">
              <p>{{(scope.row.createdAt).substr(0,10)}}</p>
            </template>
          </el-table-column>
          <el-table-column label="Dirreccion" prop="address"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Escriba para buscar"/>
            </template>
            <template slot-scope="scope">
              <detail :id="scope.row.id"></detail>
              <el-button size="mini" type="danger" @click="remove(scope.row.id )">Eliminar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import add from "./Add";
import detail from "./Detail";
import { mapState } from "vuex";
import { EventBus } from "@/service/event-bus.js";
export default {
  components: {
    add,
    detail
  },
  data() {
    return {
      tableData: [],
      search: "",
      loading: true,
      range: "",
      form: {
        startDate: "",
        endDate: ""
      }
    };
  },
  mounted() {
    this.getAll();
    EventBus.$on("submitClient", () => {
      this.getAll();
    });
  },
  methods: {
    ...mapState({
      services: state => state.services.clientService
    }),

    getAll() {
      this.loading = true;
      this.services()
        .getAll()
        .then(r => {
          this.tableData = r.data;
          this.loading = false;
        })
        .catch(e => console.log(e));
    },
    remove(id) {
      this.loading = true;
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
                message: "Cliente eliminado"
              });
              this.loading = false;
              this.getAll();
            })
            .catch(e => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Operacion cancelada"
          });
          this.loading = false;
        });
    }
  }
};
</script>
<style>
</style>
