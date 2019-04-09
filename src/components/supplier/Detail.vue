<template>
  <span>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">Ver</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-button type="primary" @click="edit = !edit">
        Editar
        <i class="el-icon-edit"></i>
      </el-button>
      <el-form class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <el-form-item label="Codigo">
          <el-input v-model="form.supplierCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nombre" prop="name">
          <el-input
            v-model="form.name"
            placeholder="Ej: Juan..."
            :disabled="edit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Compañia" prop="companyName">
          <el-input
            v-model="form.companyName"
            placeholder="Ej: Batman..."
            :disabled="edit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Numero" prop="phoneNumber">
          <el-input
            v-model="form.phoneNumber"
            placeholder="Ej: 80963244963"
            :disabled="edit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Dirreccion" prop="address">
          <el-input
            :disabled="edit"
            type="textarea"
            placeholder="Ej: calle bla bla bla......."
            v-model="form.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="!edit">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="submitClient()">Confirmar</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
  data: () => {
    return {
      form: {
        name: "",
        companyName: "",
        address: "",
        supplierCode: "",
        phoneNumber: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Porfavor ingresar el nombre",
            trigger: "blur"
          }
        ],
        companyName: [
          {
            required: true,
            message: "Porfavor ingresar el nombre de la Compañia",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "Porfavor ingresar la dirreccion",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            pattern: /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/,
            message: "Porfavor ingrese un numero",
            trigger: "blur"
          }
        ]
      },
      dialogFormVisible: false,
      edit: true
    };
  }
};
</script>

<style>
</style>
