import axios from 'axios';

const api = axios.create({ withCredentials: true });

api.interceptors.request.use((req) => {
  console.log('req', req);

  return req;
});

api.interceptors.response.use((res) => {
  console.log('res', res);

  return res;
});

export default api;
