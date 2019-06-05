<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="12" :offset="4">
      <div style="margin: 100px;"></div>
      <el-card shadow="always" class="card">
        <div class="row justify-content-center">
          <div class="col-">
            <img src="@/assets/lock.png" alt="login.png" width="200px">
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6">
            <el-form
              style="margin: 20px;"
              :label-position="labelPosition"
              label-width="100px"
              :model="form"
            >
              <el-form-item label="Correo">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="Contraseña">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="row justify-content-center">
                  <div class="col-12 text-center">
                    <el-button size="small" type="success" @click="login()">Entrar</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapState({
      service: state => state.services.authService
    }),
    ...mapActions(["auth"]),

    login() {
      this.service()
        .login(this.form)
        .then(r => {
          /**
           * 0 representa estado activo del usuario
           */
          if (r.data.userData.state === 0) {
            this.auth(r.data);
            localStorage.setItem("user", JSON.stringify(r.data));
            this.$router.push("/home");
            location.reload();
          } else {
            this.$notify({
              type: "warning",
              title: "lo sentimos",
              message: "lo sentimos su usuario no esta activo"
            });
          }
        })
        .catch(e => {
          this.$notify.error({
            title: "Error",
            message: e.response.data.messageError
          });
        });
    }
  }
};
</script>
<style Scoped>
.card {
  width: 800px;
  top: -100px;
}
</style>
