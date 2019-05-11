import Axios from "axios";
import AuthService from "../service/AuthService";
import ClientService from "../service/ClientService";
import EmployeeService from "../service/EmployeeService";
import SupplierService from "../service/SupplierService";
import ProductService from "../service/ProductService";
import HomeService from "../service/HomeService";

let apiUrl = "http://localhost:61683/api";
Axios.defaults.headers.common.Accept = "application/json";

export default {
  authService: new AuthService(Axios, apiUrl),
  clientService: new ClientService(Axios, apiUrl),
  employeeService: new EmployeeService(Axios, apiUrl),
  supplierService: new SupplierService(Axios, apiUrl),
  productService: new ProductService(Axios, apiUrl),
  homeService: new HomeService(Axios, apiUrl)
};
