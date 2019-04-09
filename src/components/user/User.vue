<template>
  <div class="row justify-content-around">
    <div class="col-4">
      <el-card shadow="hover" class="animated rollIn">
        <div class="text-center">
          <img src="@/assets/logo.png" alt>
        </div>
      </el-card>
      <el-button class="mt-2" @click="dialogFormVisible = true">Cambiar contraseña</el-button>
    </div>
    <div class="col-6">
      <el-form class="animated fadeIn" :model="form" :rules="rules" ref="form">
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
    </div>
    <el-dialog title="Nueva contraseña" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Contraseña" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirmar" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        lastName: "",
        address: "",
        clientCode: `EM-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`
      },
      dialogFormVisible: false
    };
  }
};
</script>
<style>
</style>
