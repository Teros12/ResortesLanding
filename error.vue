<template>
  <div class="min-h-screen bg-brand-black flex flex-col">
    <AppHeader />

    <main class="flex-1 flex items-center justify-center px-4 py-32">
      <div class="text-center max-w-lg">
        <!-- Geometric decoration -->
        <div class="relative w-32 h-32 mx-auto mb-8">
          <div class="absolute inset-0 border border-brand-red/20 rotate-45" />
          <div class="absolute inset-4 border border-brand-red/15 rotate-12" />
          <div class="flex items-center justify-center h-full">
            <span class="text-brand-red text-5xl font-black">{{ error?.statusCode }}</span>
          </div>
        </div>

        <h1 class="text-white text-3xl font-extrabold mb-3">
          {{ error?.statusCode === 404 ? 'Página no encontrada' : 'Algo salió mal' }}
        </h1>
        <p class="text-white/50 mb-8 leading-relaxed">
          {{ error?.statusCode === 404
            ? 'La página que buscás no existe o fue movida.'
            : 'Ocurrió un error inesperado. Por favor intentá de nuevo.' }}
        </p>

        <button class="btn-primary inline-flex group" @click="handleError">
          Volver al inicio
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </button>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError | null }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>
