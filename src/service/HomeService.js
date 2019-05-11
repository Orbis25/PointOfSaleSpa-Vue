export default class HomeService {
  axios;
  apiUrl;
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = `${apiUrl}/Home`;
    if (JSON.parse(localStorage.getItem("user")) != null) {
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + JSON.parse(localStorage.getItem("user")).token;
    }
  }

  home() {
    return this.axios.get(`${this.apiUrl}`);
  }
}
