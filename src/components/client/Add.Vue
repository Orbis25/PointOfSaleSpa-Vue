<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">Nuevo</el-button>
    <el-dialog class title="Datos del Nuevo Cliente" :visible.sync="dialogFormVisible">
      <el-form v-loading="loading" class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <el-form-item label="Codigo" :label-width="formLabelWidth">
          <el-input v-model="form.clientCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nombre" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="Ej: Juan..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Apellidos" :label-width="formLabelWidth" prop="lastName">
          <el-input v-model="form.lastName" placeholder="Ej: Batman..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Numero" :label-width="formLabelWidth" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="Ej: 80963244963" autocomplete="off"></el-input>
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
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="submitClient()">Confirmar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
 import { EventBus } from "@/service/event-bus.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      loading:false,
      form: {
        name: "",
        lastName: "",
        address: "",
        phoneNumber: "",
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
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapState({
      services: state => state.services.clientService
    }),
    submitClient() {
      this.loading =true
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.services()
            .add(this.form)
            .then(r => {
              this.$message({
                message: "Cliente agregado con exito",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.loading = false
              EventBus.$emit('submitClient')
              EventBus.$emit('alert', "Se agrego un cliente")
            })
            .catch(e => {
              this.$message({
                message: "lo sentimos! , intente de nuevo",
                type: "error"
              });
            });
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
