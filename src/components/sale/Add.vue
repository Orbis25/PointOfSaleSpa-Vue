<template>
  <div>
    <h2 class="text-center">Nueva venta</h2>
    <el-form
      :label-position="labelPosition"
      :rules="rules"
      label-width="100px"
      :model="formLabelAlign"
      ref="formLabelAlign"
    >
      <div class="row">
        <div class="col-6">
          <div style="margin: 20px;"></div>
          <el-form-item label="Fecha">
            <el-input v-model="formLabelAlign.date" disabled></el-input>
          </el-form-item>
          <el-form-item label="Vendedor">
            <el-input v-model="formLabelAlign.employee" disabled></el-input>
          </el-form-item>
          <el-form-item label="Cliente" prop="clientId">
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
            <el-button
              v-show="this.formLabelAlign.total > 0"
              @click="addSale()"
              type="success"
            >Procesar</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <AddProduct></AddProduct>
    <div class="row">
      <div class="col">
        <el-table :data="products" style="width: 100%" height="600">
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
          <el-table-column label="Precio" width="300">
            <template slot-scope="scope">
              <input
                class="form-control"
                :id="'price'+scope.row.id"
                :value="scope.row.price"
                disabled
              >
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
                :id="scope.row.id"
              >
            </template>
          </el-table-column>
          <el-table-column label="Eliminar">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="removeProduct(scope.row.id)"
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
import { mapSatate, mapState } from "vuex";
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
        employeeid: JSON.parse(localStorage.getItem("user")).id,
        employee: JSON.parse(localStorage.getItem("user")).user,
        saleCode: `SL-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`,
        type: "",
        total: "",
        clientId: "",
        products: []
      },
      rules: {
        clientId: [
          {
            required: true,
            message: "Porfavor seleccione el cliente",
            trigger: "change"
          }
        ]
      },
      products: [],
      qyt: 0
    };
  },
  mounted() {
    //add client
    EventBus.$on("getClientId", id => {
      this.formLabelAlign.clientId = id;
    });
    //add product
    EventBus.$on("add", model => {
      if (this.products.length <= 0) {
        this.products.push(model);
      } else if (this.products.filter(x => x.id == model.id).length == 0) {
        this.products.push(model);
      }
    });
  },
  methods: {
    ...mapState({
      service: state => state.services.saleService
    }),

    changeQyt(id) {
      let price = document.getElementById(`price${id}`).value;
      let quantity = document.getElementById(id).value;
      if (this.formLabelAlign.products.length <= 0) {
        this.formLabelAlign.products.push({
          id,
          quantity,
          price
        });
      } else if (
        this.formLabelAlign.products.filter(x => x.id == id).length == 0
      ) {
        this.formLabelAlign.products.push({
          id,
          quantity,
          price
        });
      } else {
        this.formLabelAlign.products = this.formLabelAlign.products.filter(
          x => x.id != id
        );
        this.formLabelAlign.products.push({
          id,
          quantity,
          price
        });
      }
      this.total();
    },
    removeProduct(id) {
      this.products = this.products.filter(x => x.id != id);
      this.formLabelAlign.products = this.formLabelAlign.products.filter(
        x => x.id != id
      );
      this.total();
    },
    addSale() {
      this.$refs["formLabelAlign"].validate(valid => {
        if (valid) {
          this.service()
            .add(this.formLabelAlign)
            .then(r => {
              this.$message({
                message: "Venta Realizada",
                type: "success"
              });

              EventBus.$emit("add");
              this.$router.push("/sale");
            })
            .catch(e =>
              this.$message({
                message: "Lo sentimos la venta no se pudo realizar",
                type: "error"
              })
            );
        }
      });
    },
    total() {
      let totalv = 0;
      this.formLabelAlign.products.forEach(e => {
        totalv = eval(totalv + e.quantity * e.price);
      });
      this.formLabelAlign.total = totalv;
      totalv = 0;
    }
  }
};
</script>
<style>
</style>
