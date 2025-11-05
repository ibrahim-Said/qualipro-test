<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg shadow-2" style="width: 400px; max-width: 90vw;">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary">Connexion</div>
        <div class="text-caption text-grey-7">Veuillez vous connecter pour continuer</div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input
          v-model="email"
          type="email"
          label="Adresse e-mail"
          outlined
          dense
        >
          <template #prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          type="password"
          label="Mot de passe"
          outlined
          dense
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <div class="text-right">
          <q-btn
            flat
            size="sm"
            label="Mot de passe oublié ?"
            color="primary"
            @click="onForgotPassword"
          />
        </div>

        <q-btn
          label="Se connecter"
          type="submit"
          color="primary"
          unelevated
          class="full-width"
          :loading="loading"
        />
      </q-form>

      <q-separator spaced />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { AuthService } from 'src/Services/AuthService'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const loading = ref(false)
const $q = useQuasar()
const router = useRouter()
const onSubmit = async () => {
  if (!email.value || !password.value) {
    $q.notify({ type: 'negative', message: 'Veuillez remplir tous les champs.' })
    return
  }

  loading.value = true
  try {
    const response = await AuthService.login({ email: email.value, password: password.value })
    AuthService.setAuthenticatedUser(response.user)
    router.push({ name: 'user.list' })
    $q.notify({ type: 'positive', message: 'Connexion réussie !' })
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Veuillez vérifier vos identifiants.' })
  } finally {
    loading.value = false
  }
}

const onForgotPassword = () => {
  $q.notify({ type: 'info', message: 'Lien de réinitialisation envoyé !' })
}

const onRegister = () => {
  $q.notify({ type: 'info', message: 'Redirection vers la page d’inscription...' })
}
</script>
