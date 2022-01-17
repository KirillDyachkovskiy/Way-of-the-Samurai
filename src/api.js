import axios from 'axios';
import { BASE_URL } from './variables';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // 'API-KEY': '5cfcc1b0-6a34-4ead-9faa-3fe4ffa94f8f',
    'API-KEY': '5008bf57-62df-4134-b948-641c777e0f16',
  },
  transformResponse: [
    (data) => {
      let response
      try {
        response = JSON.parse(data)
      } catch (error) {
        throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`)
      }
      if (response?.resultCode === 0) {
        return response.data
      } else if (response?.resultCode === 1) {
        return {}
      } else if (response?.userId) {
        return { ...response }
      } else if (response?.error === null) {
        return { items: response.items, totalcount: response.totalCount }
      } else if (typeof response === 'string' || response === null) {
        return response
      }
      else {
        throw Error(`[requestClient] Request failed with reason -  ${data}`)
      }
    }
  ]
});

export const authAPI = {
  authMe: () => instance.get('auth/me'),
  authLogIn: (data) => instance.post('/auth/login', { ...data }),
  authLogOut: () => instance.delete('/auth/login'),
}

export const profileAPI = {
  getData: (id) => instance.get(`profile/${id}`),
  getStatus: (id) => instance.get(`profile/status/${id}`),
  changeStatus: (status) => instance.put('profile/status', { status }),
}

export const usersAPI = {
  getCurrentPageData: (page, count) => instance.get(`users?page=${page}&count=${count}`),
  hasFollow: (id) => instance.get(`follow/${id}`),
  follow: (id) => instance.post(`follow/${id}`),
  unfollow: (id) => instance.delete(`follow/${id}`),
}
