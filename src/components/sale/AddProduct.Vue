<template>
  <div>
    <el-button type="primary" @click="dialogTableVisible = true">Agregar Producto</el-button>

    <el-dialog title="Productos" :visible.sync="dialogTableVisible">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        height="600"
      >
        <el-table-column label="Nombre" prop="name"></el-table-column>
        <el-table-column label="Cantidad">
          <template slot-scope="scope">
            <input
              type="number"
              class="form-control"
              min="1"
              onkeydown="return false;"
              :max="scope.row.num"
              :value="scope.row.num"
              name
              id="qyt"
            >
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Type to search"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-circle-plus"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "John Smith",
          num: 10
        },
        {
          name: "John Smith",
          num: 8
        }
      ],
      search: "",
      num: 1,
      dialogTableVisible: false,
      dialogFormVisible: false
    };
  }
};

let inp = document.getElementById("qyt");
</script>
