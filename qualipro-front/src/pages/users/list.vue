<template>
  <div class="q-pa-md" style="margin-top: 20px;">
    <q-table
      flat bordered
      title="Gestion des Collaborateurs"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
      v-model:pagination="pagination"
      :loading="userStore.isLoading"
      :filter="filter"
      @request="onRequest"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" style="margin-right: 10px;border: 1px solid #eee; padding-left: 5px;" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <EssentialLink v-if="AuthService.getRole() === 'Admin'"
          :link="{ href: '/users/create', title:'Ajouter un collaborateur', color:'primary', icon:'person_add' }"
        />

      </template>

      <template v-slot:body-cell-action="props" v-if="AuthService.getRole() === 'Admin'">
        <q-td align="center">
          <q-btn
            flat
            round
            size="sm"
            color="primary"
            icon="edit"
            @click="router.push(`/users/edit/${props.row.id}`)"
          >
            <q-tooltip>Modifier</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            size="sm"
            color="negative"
            icon="delete"
            @click="onDelete(props.row)"
          >
            <q-tooltip>Supprimer</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section class="text-h6">
          Confirmer la suppression
        </q-card-section>

        <q-card-section>
          Êtes-vous sûr de vouloir supprimer
          <strong>{{ selectedUser?.first_name }} {{ selectedUser?.last_name }}</strong> ?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="grey" v-close-popup />
          <q-btn flat label="Supprimer" color="negative" @click="confirmDeleteUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import EssentialLink from 'src/components/EssentialLink.vue'
import { AuthService } from 'src/Services/AuthService'
import { useUsersStore } from 'src/stores/useUsersStore'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUsersStore()
const confirmDelete = ref(false)
const selectedUser = ref(null)
const sort=userStore.getSort
const pagination =ref({
  page: userStore.getCurrentPage,
  rowsPerPage: userStore.getPerPage,
  sortBy: sort.sortBy,
  descending: sort.descending,
})
const filter = ref(null)
const columns = [
  {
    name: 'first_name',
    required: true,
    label: 'Prénom',
    align: 'left',
    field: row => row.first_name,
    sortable: true
  },
  { name: 'last_name', align: 'center', label: 'Nom', field: 'last_name', sortable: true },
  { name: 'email', label: 'Email', field: 'email', sortable: true },
  { name: 'phone', label: 'Téléphone', field: 'phone',sortable: true },
  { name: 'role', label: 'Rôle', field: 'role' ,sortable: false },
  { name: 'job', label: 'Job', field: 'job' ,sortable: true },
  { name: 'action', label: 'Action', field: 'action', sortable: false }
]

const rows = computed(() =>
  userStore.getUsers.map(user => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    job: user.job,
    role: user.role?.name
  }))
)
const onRequest=(params) => {
  userStore.setSearch(filter.value)
  userStore.setPerPage(params.pagination.rowsPerPage)
  userStore.setCurrentPage(params.pagination.page)
  userStore.setSort({ sortBy: params.pagination.sortBy, descending: params.pagination.descending })
  userStore.fetchUsers()
}
const onDelete = (user) => {
  selectedUser.value = user
  confirmDelete.value = true
}
const confirmDeleteUser = async () => {
  await userStore.deleteUser(selectedUser.value.id)
  confirmDelete.value = false
  selectedUser.value = null
}
onMounted(async() => {
  if (!AuthService.isAuthenticated()) return
  await userStore.fetchUsers()
})
</script>
