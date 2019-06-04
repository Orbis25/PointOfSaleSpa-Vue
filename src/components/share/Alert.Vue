<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <i class="el-icon-bell">
        <el-badge :value="data.length" class="item"></el-badge>
      </i>
    </span>
    <el-dropdown-menu style="width:400px;" slot="dropdown">
      <el-dropdown-item v-for="dt,i in data" :key="i">
        <div class="text-center">
          {{dt.detail}} - {{dt.createdAt.substr(0 , 10)}}
          <i class="el-icon-delete ml-5 text-danger"></i>
          <hr>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { EventBus } from "@/service/event-bus.js";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      data: []
    };
  },
  mounted() {
    this.getAll();
    EventBus.$on("alert", value => {
      this.add({Detail : value});
      this.getAll();
    });
  },
  methods: {
    ...mapState({
      service: state => state.services.alertService
    }),
    add(model) {
      this.service()
        .add(model)
        .then(r => console.log(r))
        .catch(e => console.log(e));
    },
    getAll() {
      this.service()
        .getAll()
        .then(result => {
          this.data = result.data;
        })
        .catch(err => {
          console.log(result);
        });
    }
  }
};
</script>

<style Scoped>
.DivWithScroll {
  height: 120px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>