<template>
  <span>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true; getById()">Ver</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-button type="primary" @click="edit = !edit">
        Editar
        <i class="el-icon-edit"></i>
      </el-button>
      <el-form v-loading="loading" class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <div class="row">
          <div class="col">
            <el-card shadow="hover" class="card-img">
              <div class="text-center">
                <img :src="`${IMG}${form.avatar}`" class="img-cent" height="250px" alt>
              </div>
              <div v-show="!edit" class="text-center input-group mb-3">
                <div class="custom-file">
                  <input
                    id="inputGroupFile01"
                    ref="file"
                    type="file"
                    class="custom-file-input"
                    aria-describedby="inputGroupFileAddon01"
                    @change="img=true;uploadImg()"
                  >
                  <label class="custom-file-label" for="inputGroupFile01">Subir imagen</label>
                  <label for v-show="img">Avatar cargado</label>
                </div>
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
            v-model="form.dni"
            :disabled="edit"
            placeholder="Ej: 402-324...."
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="edit" label="Correo" :disabled="edit" prop="email">
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
        <el-button type="primary" @click="update()">Confirm</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "@/service/event-bus.js";
import { API_IMAGES } from "@/service/UtilService";
export default {
  props: ["id"],
  data: () => {
    return {
      form: {
        id: "",
        name: "",
        lastName: "",
        address: "",
        employeecode: "",
        phoneNumber: "",
        avatar: "1",
        dni: "",
        emai: ""
      },
      imgmodel: {
        id: null,
        file: ""
      },
      loading: true,
      img: false,
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
  },
  methods: {
    ...mapState({
      service: state => state.services.employeeService
    }),
    getById() {
      this.loading = true;
      this.service()
        .getById(this.id)
        .then(r => {
          this.form.name = r.data.name;
          this.form.lastName = r.data.lastName;
          this.form.address = r.data.address;
          this.form.employeecode = r.data.employeeCode;
          this.form.phoneNumber = r.data.phoneNumber;
          this.form.avatar = r.data.avatar;
          this.form.email = r.data.email;
          this.form.dni = r.data.dni;
        })
        .catch(e => console.log(e))
        .finally(() => (this.loading = false));
    },
    update() {
      this.form.id = this.id;
      this.service()
        .update(this.form)
        .then(r => {
          this.$message({
            message: "Actualizado con exito",
            type: "success"
          });
          this.dialogFormVisible = false;
          EventBus.$emit("submitEmployee");
        })
        .catch(e => {
          this.$message.error(e.response.data);
        });
    },
    uploadImg() {
      let formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      formData.append("id", this.id);
      this.service()
        .uploadImg(formData)
        .then(r => this.getById())
        .catch(e => console.log(e));
    }
  },
  computed: {
    IMG() {
      return API_IMAGES;
    }
  }
};
</script>

<style>
.card-img {
  width: 400px;
}
.img-cent {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
