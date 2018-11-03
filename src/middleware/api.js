import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3004';

// RESTful API
// CRUD operations

const Api = route => ({
  read: () => axios.get(route).then(res => res),
  create: data => axios.post(route, data).then(res => res),
  delete: data => axios.delete(`${route}/${data.id}`).then(res => res),
  update: data => axios.put(`${route}/${data.id}`, data).then(res => res)
});

export default Api;