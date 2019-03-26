import Vue from "vue";
import Router from "vue-router";
import Login from "../components/auth/Login";
import Home from "../components/home/Home";
import Client from "../components/client/Client";
import Employe from '../components/employe/Employe'
Vue.use(Router);
export default new Router({
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/Home", name: "home", component: Home },
    { path: "/clients", name: "Client", component: Client },
    { path: "/employes", name: "Employe", component: Employe },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requirevisitors: true
      }
    }
  ]
});
