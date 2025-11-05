import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
    totalPages: 0,
    totalItems: 0,
    currentPage: 1,
    perPage: 10,
    loading: false,
    search:null,
    sort:{ sortBy: 'id', descending: true },
    validationErrors: [],
  }),

  getters: {
    isLoading: (state) => state.loading,
    getUsers: (state) => state.users,
    getTotalPages: (state) => state.totalPages,
    getCurrentPage: (state) => state.currentPage,
    getPerPage: (state) => state.perPage,
    getTotalItems: (state) => state.totalItems,
    getSearch: (state) => state.search,
    getSort: (state) => state.sort,
  },

  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await api.get('/users', {
          params: {
            page: this.currentPage,
            per_page: this.perPage,
            sortBy: this.sort.sortBy,
            direction: this.sort.descending ? 'desc' : 'asc',
            search: this.search
          },
        })
        this.users = response.data.users
        this.totalPages = response.data.pagination.totalPages
        this.totalItems = response.data.pagination.totalItems
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        this.loading = false
      }
    },
    async createUser(userData) {
      this.loading = true
      try {
        await api.post('/users', userData)
      } catch (error) {
        const err = new Error('Erreur lors de la création de l\'utilisateur')
        err.errors = error.response?.data?.errors || []
        throw err
      } finally {
        this.loading = false
      }
    },
    async updateUser(userId, userData) {
      this.loading = true
      try {
        await api.put(`/users/${userId}`, userData)
      } catch (error) {
        let err = new Error('Erreur lors de la mise à jour de l\'utilisateur')
        err.errors = error.response?.data?.errors || []
        throw err
      } finally {
        this.loading = false
      }
    },
    async getUserById(userId) {
      this.loading = true
      try {
        const response = await api.get(`/users/${userId}`)
        return response.data.user
      } catch (error) {
        console.error('Error fetching user by ID:', error)
        return null
      } finally {
        this.loading = false
      }
    },
    async deleteUser(userId) {
      this.loading = true
      try {
        await api.delete(`/users/${userId}`)
        this.fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
      } finally {
        this.loading = false
      }
    },

    setCurrentPage(page) {
      if (page !== this.currentPage) {
        this.currentPage = page
        this.fetchUsers()
      }
    },
    setSearch(search) {
      this.search = search
    },
    setSort(sort) {
      this.sort = sort
    },
    setPerPage(perPage) {
      this.perPage = perPage
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
