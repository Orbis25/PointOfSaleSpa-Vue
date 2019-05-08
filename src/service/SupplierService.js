export default class SupplierService {
  axios;
  apiUrl;
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = `${apiUrl}/supplier`;
    if (JSON.parse(localStorage.getItem("user")) != null) {
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + JSON.parse(localStorage.getItem("user")).token;
    }
  }

  getAll() {
    return this.axios.get(`${this.apiUrl}/getall`);
  }

  getById(id) {
    return this.axios.get(`${this.apiUrl}/getbyid/${id}`);
  }

  add(model) {
    return this.axios.post(`${this.apiUrl}/create`, model);
  }

  update(model) {
    return this.axios.put(`${this.apiUrl}/update`, model);
  }

  remove(id) {
    return this.axios.delete(`${this.apiUrl}/${id}`);
  }
}
