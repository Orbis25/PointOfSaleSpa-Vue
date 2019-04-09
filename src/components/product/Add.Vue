<template>
  <div>
    <el-button icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">Nuevo</el-button>
    <el-dialog class title="Datos del Nuevo Producto" :visible.sync="dialogFormVisible">
      <el-form class="animated fadeIn" :model="form" :rules="rules" ref="form">
        <el-form-item label="Codigo" :label-width="formLabelWidth">
          <el-input v-model="form.productCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Nombre" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="Ej: Iphone 6s" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Modelo" :label-width="formLabelWidth" prop="model">
          <el-input v-model="form.model" placeholder="Ej: xsg-7" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tipo" :label-width="formLabelWidth" prop="type">
          <el-input v-model="form.type" placeholder="Ej: Smartphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Marca" :label-width="formLabelWidth" prop="brand">
          <el-input v-model="form.brand" placeholder="Ej: Apple" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Cantidad" :label-width="formLabelWidth" prop="quantity">
          <el-input-number v-model="form.quantity" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="Suplidor" :label-width="formLabelWidth" prop="quantity">
          <el-select v-model="form.supplierId" clearable placeholder="Select">
            <el-option v-for="item in suppliers" :key="item.Id" :label="item.name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Precio" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" type="text" autocomplete="off"></el-input>
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
        model: "",
        address: "",
        productCode: `PD-${Math.floor(Math.random() * (9999 - 1000 + 1)) +
          1000}`,
        type: "",
        avatar: "1",
        brand: "",
        quantity: "",
        price: "",
        supplierId: ""
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
      formLabelWidth: "120px",
      suppliers: []
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
