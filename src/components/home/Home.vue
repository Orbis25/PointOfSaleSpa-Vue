<template>
  <el-row v-loading="loading" justify="center" :gutter="24">
    <el-col :span="5.5">
          <img src="@/assets/inflation.png" class="text-center" height="300px" width="auto" alt>
    </el-col>
    <el-col class="mt-2" v-for="(i,o) in title" :key="o" :span="6">
      <el-card shadow="hover" class="animated rollIn">
        <div class="text-center">
          <!-- <img :src="`$P{" class="text-center" height="300px" width="auto" alt> -->
          <br />{{i.name}} <br/> {{i.quantity}}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      title: [],
      loading:false,
    };
  },
  mounted(){
    this.home();
  },
  methods:{
    ...mapState({
      service : state => state.services.homeService
    }),
    home(){
      this.loading = true;
      this.service()
      .home().then(r => this.title = r.data)
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
    }
  }
};
</script>

<style Scoped>

</style>
