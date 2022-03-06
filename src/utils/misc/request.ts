import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err: any) => {
    return Promise.reject(err.response.data);
  },
);

export { request };
