export default class ClientService {
  axios;
  apiUrl;
  constructor(axios, apiUrl) {
    this.apiUrl = `${apiUrl}/client`;
    this.axios = axios;
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

}
