import axios from 'axios';

const api = axios.create({ withCredentials: true });

api.interceptors.request.use((req) => {
  console.log(req);

  return req;
});

export default api;
