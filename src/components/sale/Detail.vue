<template>
  <div>
    <h2 class="text-center">Detalle venta</h2>
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
            <el-input v-model="formLabelAlign.client" disabled></el-input>
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
            <el-button type="primary">imprimir</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">Enviar por correo</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
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
    <el-dialog title="Enviar por correo" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="Correo" prop="email">
          <el-input v-model="form.email" required autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="submitForm()">Confirmar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectClient from "./SelectClient";
import AddProduct from "./AddProduct";
export default {
  components: {
    SelectClient,
    AddProduct
  },
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        date: "",
        employeeId: "",
        client: "",
        type: "",
        total: ""
      },
      form: {
        email: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "porfavor ingrese un correo valido",
            trigger: "blur"
          },
          {
            type: "email",
            message: "porfavor ingrese un correo valido",
            trigger: "blur"
          }
        ]
      },
      tableData: [
        {
          name: "black goku",
          brand: "toe",
          quantity: 2
        }
      ],
      dialogFormVisible: false
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    submitForm() {
      this.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style Scoped>
</style>
