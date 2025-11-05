<template>
  <component
    :is="isExternal ? 'a' : 'router-link'"
    :href="isExternal ? link.href : null"
    :to="!isExternal ? link.href : null"
    class="no-decoration"
  >
    <q-item clickable :color="link.color ? link.color : 'transparent'">
      <q-item-section v-if="link.icon" avatar>
        <q-icon :name="link.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ link.title }}</q-item-label>
        <q-item-label caption>{{ link.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  link: { type: Object, default: '#' },
})

// Detect whether it's an external link
const isExternal = computed(() => /^https?:\/\//.test(props.link.href))
</script>

<style scoped>
.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>
