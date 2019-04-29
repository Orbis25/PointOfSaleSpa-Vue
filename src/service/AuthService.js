export default class AuthService {
  axios;
  apiUrl;
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = apiUrl;
  }

  login() {
    return this.axios.post(`${this.apiUrl}/login`);
  }
}
