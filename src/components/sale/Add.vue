<template>
  <div>
    <h2 class="text-center">Nueva venta</h2>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <div class="row">
        <div class="col-6">
          <div style="margin: 20px;"></div>
          <el-form-item label="Fecha">
            <el-input v-model="formLabelAlign.date" disabled></el-input>
          </el-form-item>
          <el-form-item label="Vendedor">
            <el-input v-model="formLabelAlign.employeeId" disabled></el-input>
          </el-form-item>
          <el-form-item label="Cliente">
            <SelectClient></SelectClient>
          </el-form-item>
        </div>
        <div class="col-6">
          <div style="margin: 20px;"></div>
          <el-form-item label="Codigo">
            <el-input v-model="formLabelAlign.employeeId" disabled></el-input>
          </el-form-item>
          <el-form-item label="Total">
            <el-input v-model="formLabelAlign.total" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success">Procesar</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-button icon="el-icon-circle-plus-outline">Agregar Producto</el-button>
    <div class="row">
      <div class="col">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Nombre" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Marca" width="300">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.brand }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Cantidad" width="300">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.quantity }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Eliminar">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import SelectClient from "./SelectClient";
export default {
  components: {
    SelectClient
  },
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        date: "",
        employeeId: "",
        type: "",
        total: ""
      },
      tableData: [
        {
          name: "black goku",
          brand: "toe",
          quantity: 2
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style Scoped>
</style>
