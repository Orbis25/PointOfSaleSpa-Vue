<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">Nuevo</el-button>
    <el-dialog class title="Datos del Nuevo Suplidor" :visible.sync="dialogFormVisible">
      <el-form class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <el-form-item label="Codigo" :label-width="formLabelWidth">
          <el-input v-model="form.supplierCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nombre" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="Ej: Juan..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Compañia" :label-width="formLabelWidth" prop="companyName">
          <el-input v-model="form.companyName" placeholder="Ej: Batman..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Numero" :label-width="formLabelWidth" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="Ej: 80963244963" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitSupplier()">Confirm</el-button>
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
      form: {
        name: "",
        companyName: "",
        supplierCode: `SP-${Math.floor(Math.random() * (9999 - 1000 + 1)) +
          1000}`,
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
      service: state => state.services.supplierService
    }),
    submitSupplier() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.service()
            .add(this.form)
            .then(r => {
              this.$message({
                message: "Suplidor agregado",
                type: "success"
              });
              EventBus.$emit('submitSupplier')
              this.dialogFormVisible = false
            })
            .catch(e => {
              this.$message({
                message: e.response.data,
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
