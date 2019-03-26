<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <h1 class="mb-4 ml-4">Suplidores</h1>
        <el-button icon="el-icon-circle-plus-outline">Nuevo</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="24" :xl="1">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="Date" prop="date"></el-table-column>
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Escriba para buscar"/>
            </template>
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">Ver</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-03",
          name: "Jessy",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-03",
          name: "Jessy",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        }
        
      ],
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>
</style>
