import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((req) => {
  console.log('req', req);

  return req;
});

api.interceptors.response.use((res) => {
  console.log('res', res);

  return res;
});

export default api;
