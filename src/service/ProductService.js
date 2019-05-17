export default class ProductService {
  axios;
  apiUrl;
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = `${apiUrl}/product`;
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

  getByid(id) {
    return this.axios.get(`${this.apiUrl}/getbyid/${id}`);
  }

  update(model) {
    return this.axios.put(`${this.apiUrl}/update`, model);
  }

  remove(id) {
    return this.axios.delete(`${this.apiUrl}/${id}`);
  }

  spents(){
    return this.axios.get(`${this.apiUrl}/spents`);
  }

  uploadImg(model) {
    return this.axios.post(`${this.apiUrl}/upload/avatar`, model, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}
