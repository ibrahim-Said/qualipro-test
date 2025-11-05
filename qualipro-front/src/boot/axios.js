import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { AuthService } from 'src/Services/AuthService'
import { watchEffect } from 'vue'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export default defineBoot(({ app }) => {
  api.defaults.headers.common['Content-Type'] = 'application/json'
  api.defaults.headers.common['Accept'] = 'application/json'

  // Function to update token dynamically
  const setAuthHeader = () => {
    const token = AuthService.isAuthenticated() ? AuthService.getToken() : null
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }

  // Initialize once
  setAuthHeader()

  // Listen for AuthService changes if it’s reactive or event-based
  // You can trigger an event in AuthService when token changes
  window.addEventListener('token-updated', () => {
    setAuthHeader()
  })

  // Make $axios and $api available globally
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
