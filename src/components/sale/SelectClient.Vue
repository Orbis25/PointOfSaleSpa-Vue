<template>
  <el-select v-model="value8" @change="getClientId(value8)" filterable placeholder="Select">
    <el-option v-for="item in options"  :key="item.id" :label="item.name +' '+ item.lastName" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "@/service/event-bus.js";

export default {
  data() {
    return {
      options: [],
      value8: ""
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    ...mapState({
      service: state => state.services.clientService
    }),
    getClientId(id){
      EventBus.$emit("getClientId" , id)
    },
    getAll(){
      this.service()
      .getAll().then(x => this.options = x.data)
      .catch(e => console.log(e))
    }
  }
};
</script>