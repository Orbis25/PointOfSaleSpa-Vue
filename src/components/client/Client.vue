<template>
  <el-row :gutter="24">
    <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
      <h1 class="mb-4 ml-4 animated fadeIn">Clientes</h1>
      <add></add>
    </el-col>
    <div>
      <el-col class="tab" :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          id="table-client"
          height="600"
        >
          <el-table-column label="Codigo" prop="clientCode"></el-table-column>
          <el-table-column label="Nombre" prop="name"></el-table-column>
          <el-table-column label="Fecha de creacion" prop="createdAt"></el-table-column>
          <el-table-column label="Dirreccion" prop="address"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Escriba para buscar"/>
            </template>
            <template slot-scope="scope">
              <detail></detail>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row);remove()"
              >Eliminar</el-button>
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
export default {
  components: {
    add,
    detail
  },
  data() {
    return {
      tableData: [
        {
          clientCode: "0101",
          createdAt: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        }
      ],
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    remove() {
      this.$confirm("Seguro que desea eliminarlo?", "Eliminar", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "Cliente eliminado"
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
