<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group" aria-label="Resortes NV – Inicio">
        <img
          src="https://resortesnv.com.ar/wp-content/uploads/NV-logo.svg"
          alt="Resortes NV"
          width="80"
          height="40"
          class="h-10 w-auto transition-opacity duration-300 group-hover:opacity-80"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li>
          <button
            class="nav-link text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-200"
            @click="scrollToSection('mercados')"
          >
            Mercados
          </button>
        </li>
        <li>
          <button
            class="nav-link text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-200"
            @click="scrollToSection('empresa')"
          >
            Empresa
          </button>
        </li>
        <li>
          <NuxtLink
            to="/faq"
            class="nav-link text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-200"
            :class="{ 'text-brand-red': route.path === '/faq' }"
          >
            FAQ
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/contacto"
            class="btn-primary text-sm px-5 py-2.5"
          >
            Contacto
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile Hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2 group"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="menuOpen ? 'opacity-0' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="md:hidden bg-brand-black/95 backdrop-blur-md border-t border-white/5"
      >
        <ul class="flex flex-col py-4 px-6 gap-4">
          <li>
            <button
              class="text-base font-medium text-white/70 hover:text-white transition-colors duration-200 w-full text-left py-2"
              @click="scrollToSection('mercados')"
            >
              Mercados
            </button>
          </li>
          <li>
            <button
              class="text-base font-medium text-white/70 hover:text-white transition-colors duration-200 w-full text-left py-2"
              @click="scrollToSection('empresa')"
            >
              Empresa
            </button>
          </li>
          <li>
            <NuxtLink
              to="/faq"
              class="block text-base font-medium text-white/70 hover:text-white transition-colors duration-200 py-2"
              :class="{ 'text-brand-red': route.path === '/faq' }"
              @click="menuOpen = false"
            >
              FAQ
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contacto"
              class="block text-base font-semibold text-brand-red py-2"
              @click="menuOpen = false"
            >
              Contacto
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const scrolled = ref(false)
const menuOpen = ref(false)

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 40
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

async function scrollToSection(id: string) {
  menuOpen.value = false

  if (route.path !== '/') {
    await router.push(`/#${id}`)
    await nextTick()
    await new Promise(r => setTimeout(r, 100))
  }

  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #22c55e;
  transition: width 0.3s ease;
}
.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}
</style>
