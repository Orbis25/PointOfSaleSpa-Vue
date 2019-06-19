<template>
  <span>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true; getById()">Ver</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-button type="primary" @click="edit = !edit">
        Editar
        <i class="el-icon-edit"></i>
      </el-button>
      <el-form v-loading="loading" class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <el-form-item label="Codigo">
          <el-input v-model="form.clientCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="form.name" autocomplete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="Apellidos" prop="lastName">
          <el-input v-model="form.lastName" autocomplete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="Numero" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" autocomplete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="Dirreccion" prop="address">
          <el-input :disabled="edit" type="textarea" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="!edit">
        <el-button @click="dialogFormVisible = false; edit=true">Cancelar</el-button>
        <el-button type="primary" @click="update()">Confirmar</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from '@/service/event-bus.js'
export default {
  props: ["id"],
  data() {
    return {
      dialogFormVisible: false,
      loading: true,
      form: {
        id: 0,
        name: "",
        lastName: "",
        address: "",
        clientCode: "",
        phoneNumber: ""
      },
      rules: {
        phoneNumber: [
          {
            required: true,
            pattern: /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/,
            message: "Porfavor ingrese un numero",
            trigger: "blur"
          }
        ]
      },
      edit: true
    };
  },
  methods: {
    ...mapState({
      service: state => state.services.clientService
    }),
    getById() {
      this.loading = true;
      this.service()
        .getById(this.id)
        .then(r => {
          this.form.name = r.data.name;
          this.form.lastName = r.data.lastName;
          this.form.address = r.data.address;
          this.form.clientCode = r.data.clientCode;
          this.form.phoneNumber = r.data.phoneNumber;
          this.loading = false;
        })
        .catch(e => console.log(e));
    },
    update() {
      this.form.id = this.id;
      this.loading = true;
      this.service()
        .update(this.form)
        .then(r => {
          this.$message({
            message: "Se ha actualizado el cliente",
            type: "success"
          });
          this.edit = true;
          this.loading = false;
          this.dialogFormVisible = false;
          EventBus.$emit('submitClient');
        })
        .catch(e =>
          this.$message({
            message: "lo sentimos no se ha actualizado el cliente",
            type: "error"
          })).finally(()=> this.edit = true)
    }
  }
};
</script>

<style>
</style>
