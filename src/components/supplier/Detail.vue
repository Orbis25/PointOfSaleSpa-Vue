<template>
  <span>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true; getById()">Ver</el-button>
    <el-dialog v-loading="loading" :visible.sync="dialogFormVisible">
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
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="!edit">
        <el-button @click="dialogFormVisible = false; edit = true">Cancelar</el-button>
        <el-button type="primary" @click="update()">Confirmar</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "@/service/event-bus.js";
export default {
  props: ["id"],
  data: () => {
    return {
      loading: true,
      form: {
        id: "",
        name: "",
        companyName: "",
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
  },
  methods: {
    ...mapState({
      service: state => state.services.supplierService
    }),
    getById() {
      this.loading = true;
      this.service()
        .getById(this.id)
        .then(r => {
          this.form.name = r.data.name;
          this.form.companyName = r.data.companyName;
          this.form.supplierCode = r.data.supplierCode;
          this.form.phoneNumber = r.data.phoneNumber;
        })
        .catch(e =>
          this.$message({
            message: e.response.data,
            type: "error"
          })
        )
        .finally(() => (this.loading = false));
    },
    update() {
      this.form.id = this.id;
      this.loading = true;
      this.service()
        .update(this.form)
        .then(r => {
          this.$message({
            message: "suplidor actualizado",
            type: "success"
          });
          this.dialogFormVisible = false;
          EventBus.$emit("submitSupplier");
        })
        .catch(e => {
          this.$message({
            message: e.response.data,
            type: "error"
          });
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>
</style>
