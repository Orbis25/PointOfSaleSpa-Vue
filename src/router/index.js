import Vue from "vue";
import Router from "vue-router";
import Login from "../components/auth/Login";
import Home from "../components/home/Home";
import Client from "../components/client/Client";
import Employe from "../components/employe/Employe";
import Suppler from "../components/supplier/Supplier";
import Product from "../components/product/Product";
import NotFound from "../components/share/404";
import User from "../components/user/Profile";
import Sale from "../components/sale/Sale";
import AddSale from "../components/sale/Add";
Vue.use(Router);
export default new Router({
  routes: [
    { path: "*", component: NotFound },
    { path: "/", name: "Home", component: Home },
    { path: "/Home", name: "home", component: Home },
    { path: "/clients", name: "Client", component: Client },
    { path: "/employes", name: "Employe", component: Employe },
    { path: "/suppliers", name: "Supplier", component: Suppler },
    { path: "/user/:id", name: "user", component: User },
    { path: "/sale", name: "sale", component: Sale },
    { path: "/sale/add", name: "addSale", component: AddSale },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requirevisitors: true
      }
    },
    {
      path: "/products",
      name: "Product",
      component: Product
    }
  ]
});
