import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const setAxios = async (user) => {
  const token = await user?.getIdToken();
  instance.defaults.headers.common['authorization'] = token;
};

export const getAxios = (url, config) => {
  return instance.get(url, config);
};

export const postAxios = (url, data) => {
  return instance.post(url, data);
};

export const patchAxios = (url, data) => {
  return instance.patch(url, data);
};
