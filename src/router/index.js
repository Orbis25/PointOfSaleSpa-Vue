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
import Detail from "../components/sale/Detail";

Vue.use(Router);
export default new Router({
  routes: [
    { path: "*", component: NotFound },
    {
      path: "/",
      name: "Home",
      component: Home,

      meta: { requiresAuth: true }
    },
    {
      path: "/Home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/clients",
      name: "Client",
      component: Client,
      meta: { requiresAuth: true }
    },
    {
      path: "/employes",
      name: "Employe",
      component: Employe,
      meta: { requiresAuth: true }
    },
    {
      path: "/suppliers",
      name: "Supplier",
      component: Suppler,
      meta: { requiresAuth: true }
    },
    {
      path: "/user/:id",
      name: "user",
      component: User,
      meta: { requiresAuth: true },
      props:true
    },
    {
      path: "/sale",
      name: "sale",
      component: Sale,
      meta: { requiresAuth: true }
    },
    {
      path: "/sale/add",
      name: "addSale",
      component: AddSale,
      meta: { requiresAuth: true }
    },
    {
      path: "/sale/:id/detail",
      name: "detail",
      component: Detail,
      meta: { requiresAuth: true },
      props:true
    },
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
      component: Product,
      meta: { requiresAuth: true }
    }
  ]
});
