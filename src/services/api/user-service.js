import API from './api-service';

const baseUrl = 'users'

export default {
  validateUser(password) {
    return API.post(`${baseUrl}/validate`, { password, });
  },
}