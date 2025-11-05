import {api} from "src/boot/axios"

export const AuthService = {
  login(credentials) {
    return api.post('/auth/sign-in', credentials)
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw new Error('Invalid email or password')
      })
  },
  isAuthenticated() {
    return !!localStorage.getItem('authenticatedUser')
  },
  setAuthenticatedUser(user) {
    localStorage.setItem('authenticatedUser', JSON.stringify(user))
  },
  getAuthenticatedUser() {
    const user = localStorage.getItem('authenticatedUser')
    return user ? JSON.parse(user) : null
  },
  logout() {
    localStorage.removeItem('authenticatedUser')
  },
  getToken() {
    const user = this.getAuthenticatedUser()
    return user ? user.accessToken : null
  },
  getRole() {
    const user = this.getAuthenticatedUser()
    return user ? user.role?.name : null
  }
}
