import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: 'http://localhost:3000/api'})
Vue.prototype.$api = api

export { axios, api }
