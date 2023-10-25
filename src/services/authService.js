import { API_URL } from "./API_URL";

import axios from "axios";

export const get = (route) => {
  let token = localStorage.getItem("authToken");

  return axios.get(API_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  })
};
export const post = (route, body) => {
  let token = localStorage.getItem("authToken");
  // console.log('posting');
  return axios.post(API_URL + route, body, {
    headers: { Authorization: `Bearer ${token}` },
  })
};
export const put = (route, id) => {
  let token = localStorage.getItem("authToken");

  return axios.put(API_URL + route, id, {
    headers: { Authorization: `Bearer ${token}` },
  })
};
export const del = (route) => {
  let token = localStorage.getItem("authToken");

  return axios.delete(API_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  })
};