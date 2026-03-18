<template>
  <div class="min-h-screen bg-brand-black">
    <AppHeader />

    <main class="pt-24">
      <!-- Page Hero -->
      <section class="relative py-16 lg:py-24 overflow-hidden bg-[#0d0d0d]">
        <div class="absolute inset-0 bg-gradient-to-br from-[#051a08] via-[#0d0d0d] to-[#0d0d0d]" />
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
        <div class="absolute right-8 top-8 w-24 h-24 border border-brand-red/15 rotate-45 pointer-events-none" />

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span class="text-brand-red text-sm font-semibold tracking-widest uppercase">Escribinos</span>
          <div class="section-sep" />
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Ponete en<br>
            <span class="gradient-text">Contacto</span>
          </h1>
          <p class="text-white/50 text-lg mt-4 max-w-xl">
            Estamos disponibles para consultas, distribución y pedidos especiales.
          </p>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <!-- Form column -->
            <div class="lg:col-span-3">
              <div ref="formRef" class="animate-on-scroll">
                <h2 class="text-white text-2xl font-bold mb-2">Envianos tu consulta</h2>
                <p class="text-white/40 text-sm mb-8">Completá el formulario y nos comunicamos a la brevedad.</p>

                <!-- Success message -->
                <Transition name="success">
                  <div
                    v-if="submitted"
                    class="mb-6 p-5 border border-green-500/30 bg-green-500/5 flex items-start gap-3"
                  >
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <p class="text-green-400 font-semibold text-sm">¡Mensaje enviado!</p>
                      <p class="text-white/50 text-xs mt-1">Gracias por contactarnos. Te responderemos en breve.</p>
                    </div>
                  </div>
                </Transition>

                <form class="space-y-5" @submit.prevent="handleSubmit">
                  <!-- Name -->
                  <div>
                    <label class="block text-white/60 text-sm font-medium mb-2" for="nombre">
                      Nombre y Apellido / Razón Social <span class="text-brand-red">*</span>
                    </label>
                    <input
                      id="nombre"
                      v-model="form.nombre"
                      type="text"
                      placeholder="Ej: Juan Pérez / Autopartes SA"
                      required
                      class="form-input"
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-white/60 text-sm font-medium mb-2" for="email">
                      Email <span class="text-brand-red">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="ejemplo@correo.com"
                      required
                      class="form-input"
                    />
                  </div>

                  <!-- Phone -->
                  <div>
                    <label class="block text-white/60 text-sm font-medium mb-2" for="telefono">
                      Teléfono o WhatsApp
                    </label>
                    <input
                      id="telefono"
                      v-model="form.telefono"
                      type="tel"
                      placeholder="Ej: +54 341 123-4567"
                      class="form-input"
                    />
                  </div>

                  <!-- Message -->
                  <div>
                    <label class="block text-white/60 text-sm font-medium mb-2" for="mensaje">
                      Mensaje <span class="text-brand-red">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      v-model="form.mensaje"
                      rows="5"
                      placeholder="Contanos tu consulta, producto de interés o zona de distribución..."
                      required
                      class="form-input resize-none"
                    />
                  </div>

                  <!-- Submit button -->
                  <button
                    type="submit"
                    class="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="sending"
                  >
                    <span v-if="!sending" class="flex items-center gap-2 justify-center">
                      Enviar mensaje
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </span>
                    <span v-else class="flex items-center gap-2 justify-center">
                      <div class="spinner" />
                      Enviando...
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Info column -->
            <div class="lg:col-span-2">
              <div ref="infoRef" class="animate-on-scroll-right space-y-8">
                <!-- Contact info -->
                <div>
                  <h3 class="text-white font-bold text-lg mb-6">Información de contacto</h3>
                  <ul class="space-y-5">
                    <!-- Address -->
                    <li class="flex gap-4">
                      <div class="flex-shrink-0 w-10 h-10 border border-white/10 bg-brand-gray flex items-center justify-center">
                        <svg class="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                      <div>
                        <p class="text-white font-medium text-sm">Dirección</p>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Camilo+Aldao+3451+Rosario+Santa+Fe+Argentina"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-white/50 hover:text-white text-sm mt-0.5 transition-colors duration-200 group inline-block"
                        >
                          Camilo Aldao 3451<br>Rosario, Santa Fe
                        </a>
                      </div>
                    </li>

                    <!-- Phone -->
                    <li class="flex gap-4">
                      <div class="flex-shrink-0 w-10 h-10 border border-white/10 bg-brand-gray flex items-center justify-center">
                        <svg class="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      </div>
                      <div>
                        <p class="text-white font-medium text-sm">Teléfono</p>
                        <a href="tel:03414430908" class="text-white/50 hover:text-white text-sm transition-colors duration-200">
                          (0341) 4430908
                        </a>
                      </div>
                    </li>

                    <!-- WhatsApp 1 -->
                    <li class="flex gap-4">
                      <div class="flex-shrink-0 w-10 h-10 border border-[#25D366]/20 bg-[#25D366]/5 flex items-center justify-center">
                        <svg class="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <p class="text-white font-medium text-sm">WhatsApp</p>
                        <div class="flex flex-col gap-1 mt-0.5">
                          <a
                            href="https://wa.me/543413663927"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-white/50 hover:text-[#25D366] text-sm transition-colors duration-200 flex items-center gap-1"
                          >
                            341 366-3927
                            <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                          </a>
                          <a
                            href="https://wa.me/543413134955"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-white/50 hover:text-[#25D366] text-sm transition-colors duration-200 flex items-center gap-1"
                          >
                            341 313-4955
                            <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <!-- Divider -->
                <div class="border-t border-white/8" />

                <!-- Quick links -->
                <div>
                  <h4 class="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Accesos rápidos</h4>
                  <div class="space-y-2">
                    <NuxtLink to="/catalogo/automotor" class="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200 group py-1.5">
                      <svg class="w-4 h-4 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Catálogo Automotor
                      <svg class="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </NuxtLink>
                    <NuxtLink to="/catalogo/autobuses" class="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200 group py-1.5">
                      <svg class="w-4 h-4 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Catálogo Autobuses
                      <svg class="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </NuxtLink>
                    <NuxtLink to="/faq" class="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200 group py-1.5">
                      <svg class="w-4 h-4 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Preguntas Frecuentes
                      <svg class="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Contacto | Resortes NV',
  meta: [
    {
      name: 'description',
      content: 'Contactá a Resortes NV para consultas, distribución, pedidos a medida o información sobre catálogos. Rosario, Santa Fe.',
    },
  ],
})

const formRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)
const sending = ref(false)
const submitted = ref(false)

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
})

async function handleSubmit() {
  sending.value = true
  // Simulate sending (no backend yet)
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  submitted.value = true
  // Reset form
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  form.mensaje = ''
  // Auto-hide after 5s
  setTimeout(() => { submitted.value = false }, 5000)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    },
    { threshold: 0.1 }
  )

  if (formRef.value) observer.observe(formRef.value)
  if (infoRef.value) observer.observe(infoRef.value)

  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.success-enter-active,
.success-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.success-enter-from,
.success-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
