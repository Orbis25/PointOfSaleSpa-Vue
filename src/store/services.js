import Axios from "axios";
import AuthService from "../service/AuthService";
import ClientService from "../service/ClientService";
import EmployeeService from "../service/EmployeeService";

let apiUrl = "http://localhost:61683/api";
Axios.defaults.headers.common.Accept = "application/json";

export default {
  authService: new AuthService(Axios, apiUrl),
  clientService: new ClientService(Axios, apiUrl),
  employeeService: new EmployeeService(Axios, apiUrl)
};
