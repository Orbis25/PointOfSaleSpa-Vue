<template>
  <div>
    <h2 class="text-center">Detalle venta</h2>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
      <div class="row">
        <div class="col-6">
          <div style="margin: 20px;"></div>
          <el-form-item label="Fecha">
            <el-input v-model="formLabelAlign.date" disabled></el-input>
          </el-form-item>
          <el-form-item label="Vendedor">
            <el-input v-model="formLabelAlign.employeeId" disabled></el-input>
          </el-form-item>
          <el-form-item label="Cliente">
            <el-input v-model="formLabelAlign.client" disabled></el-input>
          </el-form-item>
        </div>
        <div class="col-6">
          <div style="margin: 20px;"></div>
          <el-form-item label="Codigo">
            <el-input v-model="formLabelAlign.code" disabled></el-input>
          </el-form-item>
          <el-form-item label="Total">
            <el-input v-model="formLabelAlign.total" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportToPdf()">imprimir</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="row">
      <div class="col">
        <el-table id="basic-table" :data="tableData" style="width: 100%">
          <el-table-column label="Nombre" width="400">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Marca" width="400">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.brand }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Cantidad" width="250">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.quantity }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="precio" width="200">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.price }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="Enviar por correo" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="Correo" prop="email">
          <el-input v-model="form.email" required autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="submitForm()">Confirmar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SelectClient from "./SelectClient";
import AddProduct from "./AddProduct";
import { mapState } from "vuex";
import jspdf from "jspdf";
import "jspdf-autotable";
export default {
  components: {
    SelectClient,
    AddProduct
  },
  props: ["id"],
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        code: "",
        date: "",
        employeeId: "",
        client: "",
        type: "",
        total: ""
      },
      form: {
        email: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "porfavor ingrese un correo valido",
            trigger: "blur"
          },
          {
            type: "email",
            message: "porfavor ingrese un correo valido",
            trigger: "blur"
          }
        ]
      },
      tableData: [],
      dialogFormVisible: false
    };
  },
  mounted() {
    this.getById();
  },
  methods: {
    ...mapState({
      service: state => state.services.saleService
    }),
    getById() {
      this.service()
        .getById(this.id)
        .then(r => {
          this.formLabelAlign.date = r.data.sale.createdAt;
          this.formLabelAlign.client = r.data.sale.fullNameClient;
          this.formLabelAlign.total = r.data.sale.total;
          this.formLabelAlign.employeeId = r.data.sale.fullNameEmployee;
          this.formLabelAlign.code = r.data.sale.saleCode;
          this.tableData = r.data.products;
        })
        .catch(e => console.log(e));
    },
    submitForm() {
      this.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    exportToPdf() {
      let body = this.tableData.map(e => {
        return {
          Producto: "Producto => " + e.name,
          Marca: "Marca => " + e.brand,
          Cantidad: "Cantidad => " + e.quantity,
          Precio: "Precio => " + e.price
        };
      });

      let doc = new jspdf();

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.text(75, 15, "Detalle de venta");

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.text(150, 40, "Fecha :" + this.formLabelAlign.date);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.text(15, 40, "Cliente :" + this.formLabelAlign.client);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.text(15, 50, "Vendedor :" + this.formLabelAlign.employeeId);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.text(150, 50, "Total :" + this.formLabelAlign.total);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.text(15, 60, "Codigo :" + this.formLabelAlign.code);

      doc.setLineWidth(1);
      doc.line(0, 70, 500, 70);

      doc.autoTable({
        margin: {top: 80},
        body
      });
      doc.save("table.pdf");
    }
  }
};
</script>

<style Scoped>
</style>
