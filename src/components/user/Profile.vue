<template>
  <div class="row justify-content-around">
    <div class="col-4">
      <el-card shadow="hover" class="animated rollIn">
        <div class="text-center">
          <img class="img-cent" height="250px" :src="IMG+imguser" alt>
        </div>
        <i class="el-icon-edit edit-img" @click="centerDialogVisible = true" v-show="!edit"></i>
      </el-card>
      <el-button class="mt-2" @click="dialogFormVisible = true">Cambiar contraseña</el-button>
    </div>
    <div class="col-6">
      <el-form class="animated fadeIn" :model="form" ref="form">
        <el-form-item label="Codigo">
          <el-input v-model="form.employeCode" autocomplete="off" :disabled="true"></el-input>
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
        <el-form-item label="Dirreccion" prop="address">
          <el-input
            type="textarea"
            placeholder="Ej: calle bla bla bla......."
            :disabled="edit"
            v-model="form.address"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- change the password -->
    <el-dialog title="Nueva contraseña" :visible.sync="dialogFormVisible">
      <el-form :model="formpass">
        <el-form-item label="Contraseña">
          <el-input v-model="formpass.pass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirmar">
          <el-input v-model="formpass.pass2" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;change()">Confirmar</el-button>
      </span>
    </el-dialog>
    <!-- uploads img -->
    <el-dialog title="Cambio de avatar" :visible.sync="centerDialogVisible" width="30%" center>
      <span>
        <div class="input-group mb-3">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
              @change="img=true"
            >
            <label class="custom-file-label" for="inputGroupFile01">Subir imagen</label>
            <label for v-show="img">Avatar cargado</label>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">Confirmar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { API_IMAGES } from "@/service/UtilService";
import { mapState } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      imguser: "",
      formpass: {
        pass: "",
        pass2:""
      },
      form: {
        name: "",
        lastName: "",
        address: "",
        employeCode: `EM-${Math.floor(Math.random() * (9999 - 1000 + 1)) +
          1000}`
      },
      dialogFormVisible: false,
      edit: true,
      centerDialogVisible: false,
      form2: {
        id: null,
        file: null
      },
      img: false
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    changeImg: () => {
      console.log("change");
      this.img = true;
    },
    ...mapState({
      service: state => state.services.employeeService
    }),
    get() {
      this.service()
        .getById(this.id)
        .then(r => {
          this.form.name = r.data.name;
          this.form.lastName = r.data.lastName;
          this.form.address = r.data.address;
          this.form.employeCode = r.data.employeeCode;
          this.imguser = r.data.avatar;
          console.log(r);
        })
        .catch(e => console.log(e));
    },
    change() {
      if(this.formpass.pass === this.formpass.pass2){
        this.service()
        .changePassword({ id: this.id, password: this.formpass.pass })
        .then(r => {
          this.$message({
                message: "Contraseña cambiada",
                type: "success"
              });
        }).catch(e => {
          this.$message({
                message: "Error al cambiar la contraseña",
                type: "error"
              });
        })
      }else{
         this.$message({
                message: "las contraseñas no coinciden",
                type: "error"
              });
      }
    }
  },
  computed: {
    IMG() {
      return API_IMAGES;
    }
  }
};
</script>
<style Scoped>
.btn-edit {
  margin-left: 525px;
}
.edit-img {
  cursor: pointer;
}
.file {
  background: #000;
}
.img-cent {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
