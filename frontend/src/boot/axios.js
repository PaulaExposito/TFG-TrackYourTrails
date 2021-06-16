import Vue from 'vue'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

Vue.prototype.$axios = axios


// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/',
//   adapter: httpAdapter,
// })
const api = axios.create({ baseURL: 'http://localhost:3000/api'})
// const api = axios.create({ baseURL: 'https://tytbackend.herokuapp.com/api'})
Vue.prototype.$api = api

export { axios, api }

// import axios from 'axios'
// import httpAdapter from 'axios/lib/adapters/http'

// const instance = axios.create({
//   baseURL: 'http://localhost:3000/api/',
//   adapter: httpAdapter,
// })

// export default {
//   searchUser(username) {
//     return instance
//       .get(`/users/${username}`)
//       .then(result => result.data)
//   }
// }