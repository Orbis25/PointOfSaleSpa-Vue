<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">Nuevo</el-button>
    <el-dialog title="Datos del Nuevo Cliente" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="Codigo" :label-width="formLabelWidth">
          <el-input v-model="form.clientCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nombre" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="Ej: Juan..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Apellidos" :label-width="formLabelWidth" prop="lastName">
          <el-input v-model="form.lastName" placeholder="Ej: Batman..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Dirreccion" prop="address" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="Ej: calle bla bla bla......."
            v-model="form.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitClient()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        lastName: "",
        address: "",
        clientCode: `CL-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`
      },
      rules: {
        name: [
          {
            required: true,
            message: "Porfavor ingresar el nombre",
            trigger: "blur"
          }
        ],
        lastName: [
          {
            required: true,
            message: "Porfavor ingresar el apellido",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "Porfavor ingresar la dirreccion",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    submitClient() {
      this.$refs["form"].validate(valid => {
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

<style>
</style>
