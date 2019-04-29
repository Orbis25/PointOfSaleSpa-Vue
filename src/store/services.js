import UtilService from "../service/UtilService";
import Axios from "axios";

let apiUrl = '';
Axios.defaults.headers.common.Accept = "application/json";

export default {

    utilService : new UtilService()

}