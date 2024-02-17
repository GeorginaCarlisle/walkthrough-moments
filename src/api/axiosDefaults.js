import axios from "axios";

axios.defaults.baseURL = 'https://walk-through-django-rest-a5d1529cfa3a.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Below intercepts the request
export const axiosReq = axios.create();
// Below intercepts the response
export const axiosRes = axios.create();