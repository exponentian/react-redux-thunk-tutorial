import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3004';

// RESTful API
// CRUD operations

const Api = route => {
  return {
    read: () => axios.get(route).then(res => res),
    create: data => axios.post(route, data).then(res => res),
    delete: id => axios.delete(`${route}/${id}`).then(res => res),
    update: (id, data) => axios.put(`${route}/${id}`, data).then(res => res)
  };
};

export default Api;