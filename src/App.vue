<template>
  <div id="app">
    <el-container>
      <el-header>
        <Navbar v-if="$route.path==='/login' ? false : true"></Navbar>
        </el-header>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Navbar from "../src/components/share/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

