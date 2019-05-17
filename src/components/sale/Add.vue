<template>
  <div>
    <h2 class="text-center">Nueva venta</h2>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <div class="row">
        <div class="col-6">
          <div style="margin: 20px;"></div>
          <el-form-item label="Fecha">
            <el-input v-model="formLabelAlign.date" disabled></el-input>
          </el-form-item>
          <el-form-item label="Vendedor">
            <el-input v-model="formLabelAlign.employee" disabled></el-input>
          </el-form-item>
          <el-form-item label="Cliente">
            {{formLabelAlign}}
            <SelectClient></SelectClient>
          </el-form-item>
        </div>
        <div class="col-6">
          <div style="margin: 20px;"></div>
          <el-form-item label="Codigo">
            <el-input v-model="formLabelAlign.saleCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="Total">
            <el-input v-model="formLabelAlign.total" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success">Procesar</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <AddProduct></AddProduct>
    <div class="row">
      <div class="col">
        <el-table :data="formLabelAlign.products" style="width: 100%" height="600">
          <el-table-column label="Nombre" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Marca" width="300">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.brand }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Cantidad">
          <template slot-scope="scope">
            <input
              type="number"
              class="form-control"
              min="1"
              @change="changeQyt(scope.row.id)"
              :max="scope.row.quantity"
              id="qyt"
            >
          </template>
        </el-table-column>
          <el-table-column label="Eliminar">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import SelectClient from "./SelectClient";
import AddProduct from "./AddProduct";
import { EventBus } from "@/service/event-bus.js";
export default {
  components: {
    SelectClient,
    AddProduct
  },
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        date:
          new Date().getDate() +
          "/" +
          eval(new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear(),
        employee: JSON.parse(localStorage.getItem("user")).user,
        saleCode: `SL-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`,
        type: "",
        total: "",
        clientId: "",
        products:[]
      },
      qyt:0
    };
  },
  mounted() {
    //add client
    EventBus.$on("getClientId" , (id) => {
      this.formLabelAlign.clientId = id;
    })
    //add product
    EventBus.$on("add" , (model) => {
      if(this.formLabelAlign.products.length <= 0){
        this.formLabelAlign.products.push(model)
      }else if(this.formLabelAlign.products.filter(x => x.id == model.id).length == 0 ){
        this.formLabelAlign.products.push(model)

      }
    })
  },
  methods: {
   changeQyt(id){
     console.log(id)
     console.log(document.getElementById('qyt').value)
//errores
    let p =  this.formLabelAlign.products.filter(x => x.id == id);
   // p[0].quantity = document.getElementById('qyt').value;
    console.log(p)
    //this.

   }
  }
};
</script>

<style Scoped>
</style>
