import axios from "axios";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    alert("We got some problem connecting to the server.Please try later");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
};
