<template>
  <span>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true; getById()">Ver</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-button type="primary" class="mb-3" @click="edit = !edit">
        Editar
        <i class="el-icon-edit"></i>
      </el-button>
      <el-form class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <div class="row">
          <div class="col">
            <el-card shadow="hover" class="card-img">
              <div class="text-center">
                <img :src="`${IMG}${form.avatar}`" height="300px" alt>
              </div>
              <div v-show="!edit" class="text-center input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    ref="file"
                    class="custom-file-input"
                    id="inputGroupFile01"
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
              <el-input v-model="form.productCode" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Nombre" prop="name">
              <el-input
                v-model="form.name"
                placeholder="Ej: Iphone 6s"
                :disabled="edit"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Modelo" prop="model">
              <el-input
                v-model="form.model"
                placeholder="Ej: xsg-7"
                :disabled="edit"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="Tipo" prop="type">
          <el-input
            v-model="form.type"
            placeholder="Ej: Smartphone"
            :disabled="edit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Marca" prop="brand">
          <el-input
            v-model="form.brand"
            placeholder="Ej: Apple"
            :disabled="edit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Cantidad" prop="quantity">
          <el-input-number class="qyt-sp" v-model="form.quantity" :disabled="edit" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="Suplidor" prop="quantity">
          <el-input v-model="form.supplierName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Precio" prop="price">
          <el-input v-model="form.price" :disabled="edit" type="text" autocomplete="off"></el-input>
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
import { EventBus } from "@/service/event-bus.js";
import { mapState } from "vuex";
import { API_IMAGES } from "@/service/UtilService";

export default {
  props: ["id"],
  data: () => {
    return {
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        model: "",
        address: "",
        productCode: "",
        type: "",
        avatar: "1",
        brand: "",
        quantity: "",
        price: "",
        supplierName: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Porfavor ingresar el nombre",
            trigger: "blur"
          }
        ],
        model: [
          {
            required: true,
            message: "Porfavor ingresar un modelo",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            pattern: /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/,
            message: "Porfavor ingrese un tipo",
            trigger: "blur"
          }
        ],
        brand: [
          {
            required: true,
            message: "Porfavor ingrese una marca",
            trigger: "blur"
          }
        ],
        quantity: [
          {
            required: true,
            message: "Porfavor ingrese una cantidad",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "Porfavor ingrese un precio",
            trigger: "blur",
            pattern: /^\d*\.?\d*$/
          }
        ],
        supplierId: [
          {
            required: true,
            message: "Porfavor seleccione un suplidor",
            trigger: "blur"
          }
        ]
      },
      suppliers: [],
      edit: true,
      img: false,
      imgmodel: {
        id: null,
        file: ""
      }
    };
  },
  methods: {
    ...mapState({
      service: state => state.services.productService
    }),
    getById() {
      this.service()
        .getByid(this.id)
        .then(r => {
          this.form.name = r.data.name;
          this.form.model = r.data.model;
          this.form.productCode = r.data.productCode;
          this.form.type = r.data.type;
          this.form.brand = r.data.brand;
          this.form.quantity = r.data.quantity;
          this.form.price = r.data.price;
          this.form.supplierName = r.data.supplier.name;
          this.form.avatar = r.data.avatar;
          console.log(r.data.avatar);
        })
        .catch(e => {
          this.$message({
            message: e.response.data,
            type: "error"
          });
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
    },
    update() {
      this.form.id = this.id;
      this.service()
        .update(this.form)
        .then(r => {
          this.$message({
            message: "Producto actualizado",
            type: "success"
          });
          this.dialogFormVisible = false;
          EventBus.$emit("submitProduct");
        })
        .catch(e => {
          this.$message({
            message: e.response.data,
            type: "error"
          });
        });
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
.qyt-sp {
  margin-right: 400px;
  width: 300px;
}
</style>
