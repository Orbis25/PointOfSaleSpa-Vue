export default class EmployeeService {
  axios;
  apiUrl;
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = `${apiUrl}/employee`;
    if (JSON.parse(localStorage.getItem("user")) != null) {
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + JSON.parse(localStorage.getItem("user")).token;
    }
  }

  getAll() {
    return this.axios.get(`${this.apiUrl}/getall`);
  }

  add(model) {
    return this.axios.post(`${this.apiUrl}/create`, model);
  }

  getById(id) {
    return this.axios.get(`${this.apiUrl}/getbyid/${id}`);
  }

  remove(id) {
    return this.axios.delete(`${this.apiUrl}/${id}`);
  }

  update(model) {
    return this.axios.put(`${this.apiUrl}/update`, model);
  }

  uploadImg(model) {
    return this.axios.post(`${this.apiUrl}/upload/img`, model, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}
