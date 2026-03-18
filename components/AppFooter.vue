<template>
  <footer class="relative bg-[#070707] border-t border-white/5 overflow-hidden">
    <!-- Geometric decorations -->
    <div class="absolute top-8 right-8 w-32 h-32 border border-brand-red/10 rotate-45 pointer-events-none" />
    <div class="absolute bottom-8 left-12 w-20 h-20 border border-brand-red/10 rotate-12 pointer-events-none" />
    <div class="absolute top-1/2 right-1/4 w-48 h-48 border border-white/3 -rotate-12 pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
      <!-- Main grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand column -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" aria-label="Resortes NV">
            <img
              src="https://resortesnv.com.ar/wp-content/uploads/NV-logo.svg"
              alt="Resortes NV"
              width="80"
              height="40"
              class="h-10 w-auto mb-4"
            />
          </NuxtLink>
          <p class="text-white/40 text-sm leading-relaxed">
            Fabricantes de resortes a gas en Argentina desde 1988.
          </p>
          <!-- Social / WA -->
          <div class="flex gap-3 mt-5">
            <a
              href="https://wa.me/543413663927"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-xs text-white/50 hover:text-[#25D366] transition-colors duration-200"
              aria-label="WhatsApp 1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              3413663927
            </a>
          </div>
        </div>

        <!-- Productos -->
        <div>
          <h4 class="text-white text-sm font-semibold uppercase tracking-widest mb-5">Productos</h4>
          <ul class="space-y-2.5">
            <li>
              <NuxtLink to="/catalogo/automotor" class="footer-link">
                Reposición Automotor
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalogo/autobuses" class="footer-link">
                Vehículos Pesados
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contacto" class="footer-link">
                Aplicaciones Agrícolas
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contacto" class="footer-link">
                Desarrollos a Medida
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Empresa -->
        <div>
          <h4 class="text-white text-sm font-semibold uppercase tracking-widest mb-5">Empresa</h4>
          <ul class="space-y-2.5">
            <li>
              <button class="footer-link text-left" @click="scrollToSection('empresa')">
                Nosotros
              </button>
            </li>
            <li>
              <NuxtLink to="/faq" class="footer-link">
                Preguntas Frecuentes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contacto" class="footer-link">
                Distribuidores
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contacto -->
        <div>
          <h4 class="text-white text-sm font-semibold uppercase tracking-widest mb-5">Contacto</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2 text-white/50 text-sm">
              <svg class="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Camilo+Aldao+3451+Rosario+Santa+Fe+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors duration-200"
              >
                Camilo Aldao 3451<br>Rosario, Santa Fe
              </a>
            </li>
            <li class="flex items-center gap-2 text-white/50 text-sm">
              <svg class="w-4 h-4 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <a href="tel:03414430908" class="hover:text-white transition-colors duration-200">
                (0341) 4430908
              </a>
            </li>
            <li class="flex items-center gap-2 text-white/50 text-sm">
              <svg class="w-4 h-4 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div class="flex flex-col gap-1">
                <a href="https://wa.me/543413663927" target="_blank" rel="noopener" class="hover:text-white transition-colors duration-200">
                  341 366-3927
                </a>
                <a href="https://wa.me/543413134955" target="_blank" rel="noopener" class="hover:text-white transition-colors duration-200">
                  341 313-4955
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-white/30 text-xs">
          © 2025 Resortes NV. Todos los derechos reservados.
        </p>
        <p class="text-white/20 text-xs">
          Fabricado en Argentina 🇦🇷
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

async function scrollToSection(id: string) {
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
.footer-link {
  @apply text-white/40 text-sm hover:text-white transition-colors duration-200 relative;
}
.footer-link::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background: #e63946;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.footer-link:hover::before {
  opacity: 1;
}
</style>
