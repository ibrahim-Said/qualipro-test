<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary" v-if="!form.id">Ajouter un collaborateur</div>
        <div class="text-h5 text-primary" v-else>Modifier un collaborateur</div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input v-model="form.first_name" type="text" label="Prénom" :rules="[val => !!val || 'Champ obligatoire']"
          outlined dense>
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input v-model="form.last_name" type="text" label="Nom" :rules="[val => !!val || 'Champ obligatoire']"
          outlined dense>
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input v-model="form.phone" type="text" :rules="[val => !!val || 'Champ obligatoire']" label="Téléphone"
          outlined dense>
          <template #prepend>
            <q-icon name="phone" />
          </template>
        </q-input>
        <q-input v-model="form.job" type="text" :rules="[val => !!val || 'Champ obligatoire']" label="Job"
          outlined dense>
          <template #prepend>
            <q-icon name="tag" />
          </template>
        </q-input>
        <q-select v-model="form.role" :options="roles" :rules="[val => !!val || 'Champ obligatoire']" label="Rôle"
          outlined dense>
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-select>
        <q-input v-model="form.email" type="email" :rules="[val => !!val || 'Champ obligatoire']" label="Adresse e-mail"
          outlined dense autocomplete="new-password">
          <template #prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input v-model="form.password"
          :rules="(!form.id || (form.id && form.password)) ? [val => !!val || 'Champ obligatoire', val => val.length >= 6 || 'Le mot de passe doit contenir au moins 6 caractères'] : []"
          type="password" label="Mot de passe" outlined dense autocomplete="new-password">
          <template #prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <div class="flex justify-center">
          <q-btn label="Sauvegarder" type="submit" color="primary" unelevated :disable="userStore.isLoading"
            :loading="userStore.isLoading" />
          <q-btn label="Annuler" color="grey" @click="router.push('/users')" />
        </div>
      </q-form>

      <q-separator spaced />
    </q-page>
  </q-page-container>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useUsersStore } from 'src/stores/useUsersStore';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
const userStore = useUsersStore();
const $q = useQuasar()
const router = useRouter();
const form = reactive({
  id: null,
  first_name: '',
  last_name: '',
  phone: '',
  role: null,
  email: '',
  password: '',
  job: ''
})
const loading = ref(false)
const roles = ref([]);
const onSubmit = async () => {
  try {
    let formData = {
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      role_id: form.role?.value,
      email: form.email,
      job: form.job,
      password:form.password
    }
    if (form.id) {
      await userStore.updateUser(form.id, formData);
    } else {
      await userStore.createUser(formData);
    }
    $q.notify({ type: 'positive', message: 'Données sauvegardées avec succès.' })
    router.push('/users');
  } catch (err) {
      Object.values(err.errors).forEach(errorMsg => {
        $q.notify({ type: 'negative', message: errorMsg })
      });
  }
};
const fetchRoles = async () => {
  let response = await api.get('/roles');
  roles.value = response.data.roles.map(role => ({ value: role.id, label: role.name }));
};
onMounted(async () => {
  if (router.currentRoute.value.params.id) {
    userStore.getUserById(router.currentRoute.value.params.id).then(user => {
      if (user) {
        form.id = user.id;
        form.first_name = user.first_name;
        form.last_name = user.last_name;
        form.phone = user.phone;
        form.role = { value: user.role.id, label: user.role.name };
        form.email = user.email;
        form.job = user.job;
      } else {
        router.push('/users');
      }
    });
  }

  await fetchRoles();
});
</script>
