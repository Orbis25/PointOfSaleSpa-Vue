<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">Nuevo</el-button>
    <el-dialog class title="Datos del Nuevo Empleado" :visible.sync="dialogFormVisible">
      <el-form class="animated bounceIn" :model="form" :rules="rules" ref="form">
        <el-form-item label="Codigo" :label-width="formLabelWidth">
          <el-input v-model="form.employeecode" autocomplete="off" :disabled="true"></el-input>
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
        <el-form-item label="Numero" :label-width="formLabelWidth" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="Ej: 80963244963" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Cedula" :label-width="formLabelWidth" prop="dni">
          <el-input v-model="form.Dni" placeholder="Ej: 402-324...." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Contraseña" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Correo" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" type="email" placeholder="Ej: orbisalonzo" class="email-em" autocomplete="off"></el-input>
          @miempresa.com
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
        employeecode: `EM-${Math.floor(Math.random() * (9999 - 1000 + 1)) +
          1000}`,
        phoneNumber: "",
        avatar: "1",
        dni: "",
        password: "",
        email: ""
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
        ],
        phoneNumber: [
          {
            required: true,
            pattern: /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/,
            message: "Porfavor ingrese un numero",
            trigger: "blur"
          }
        ],
        dni: [
          {
            required: true,
            message: "Porfavor ingrese su canet de identidad",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Porfavor ingrese una contraseña",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Porfavor ingrese un correo",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Porfavor ingrese un correo valido",
            trigger: ["blur", "change"]
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

<style Scoped>
</style>
