<template>
  <span>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">Ver</el-button>
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
                <img src="@/assets/logo.png" alt>
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
          <el-select
            v-model="form.supplierId"
            class="qyt-sp"
            :disabled="edit"
            clearable
            placeholder="Select"
          >
            <el-option v-for="item in suppliers" :key="item.Id" :label="item.name" :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Precio" prop="price">
          <el-input v-model="form.price" :disabled="edit" type="text" autocomplete="off"></el-input>
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
      dialogFormVisible: false,
      form: {
        name: "",
        model: "",
        address: "",
        productCode: "",
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
      suppliers: [],
      edit: true
    };
  }
};
</script>
<style>
.qyt-sp {
  margin-right: 400px;
  width: 300px;
}
</style>
