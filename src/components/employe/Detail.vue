<template>
  <span>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">Ver</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-button type="primary" @click="edit = !edit">
        Editar
        <i class="el-icon-edit"></i>
      </el-button>
      <el-form class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <div class="row">
          <div class="col">
            <el-card shadow="hover" class="card-img">
              <div class="text-center">
                <img src="@/assets/logo.png" alt>
              </div>
            </el-card>
          </div>
          <div class="col">
            <el-form-item label="Codigo">
              <el-input v-model="form.employeecode" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Nombre" prop="name">
              <el-input
                v-model="form.name"
                placeholder="Ej: Juan..."
                :disabled="edit"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Apellidos" prop="lastName">
              <el-input
                v-model="form.lastName"
                placeholder="Ej: Batman..."
                :disabled="edit"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item label="Dirreccion" prop="address">
          <el-input
            type="textarea"
            placeholder="Ej: calle bla bla bla......."
            v-model="form.address"
            :disabled="edit"
          ></el-input>
        </el-form-item>
        <el-form-item label="Numero" prop="phoneNumber">
          <el-input
            v-model="form.phoneNumber"
            :disabled="edit"
            placeholder="Ej: 80963244963"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Cedula" prop="dni">
          <el-input
            v-model="form.Dni"
            :disabled="edit"
            placeholder="Ej: 402-324...."
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Correo" :disabled="edit" prop="email">
          <el-input
            v-model="form.email"
            :disabled="edit"
            type="email"
            placeholder="Ej: orbisalonzo"
            class="email-em"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="!edit">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitClient()">Confirm</el-button>
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
        lastName: "",
        address: "",
        employeecode: "",
        phoneNumber: "",
        avatar: "1",
        dni: ""
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
      dialogFormVisible: false,
      edit: true
    };
  }
};
</script>

<style>
.card-img {
  width: 300px;
}
</style>
