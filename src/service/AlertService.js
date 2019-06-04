export default class AlertService {
  axios;
  apiUrl;
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = `${apiUrl}/alert`;

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

  remove(id) {
    return this.axios.delete(`${this.apiUrl}/${id}`);
  }

  update(model) {
    return this.axios.put(`${this.apiUrl}/viewall`, model);
  }
}
