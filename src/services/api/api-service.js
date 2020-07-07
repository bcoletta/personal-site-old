import axios from 'axios';

const baseURI = 'https://q6dyxmfcyc.execute-api.us-east-2.amazonaws.com/Production/';

export default {
  get(path) {
    return axios.get(`${baseURI}${path}`).then(res => res.data);
  },
  put(path, body) {
    return axios.put(`${baseURI}${path}`, body).then(res => {
      if (res && res.statusCode && res.statusCode === 403) {
        throw new Error('Unauthorized');
      }
    }).catch(err);
  },
  post(path, body) {
    return axios.post(`${baseURI}${path}`, body).then(res => res.data);
  },
}