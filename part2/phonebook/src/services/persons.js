import axios from 'axios';
// const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (createObject) => {
  const request = axios.post(baseUrl, createObject);
  return request.then(response => response.data);
}

const update = (id, updateObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, updateObject);
  return request.then(response => response.data);
}

const destroy = (id) => {
  const request = axios.delete(`${ baseUrl }/${id}`);
  return request.then(response => response.data);
}

const exportObject = { getAll, create, update, destroy };

export default exportObject;
