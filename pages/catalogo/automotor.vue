<template>
  <div class="min-h-screen bg-brand-black">
    <AppHeader />

    <main class="pt-24">
      <!-- Page Hero -->
      <section class="relative py-12 lg:py-16 overflow-hidden bg-[#0d0d0d]">
        <div class="absolute inset-0 bg-gradient-to-br from-[#051a08] via-[#0d0d0d] to-[#0d0d0d]" />
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-white/30 text-sm mb-6" aria-label="Breadcrumb">
            <NuxtLink to="/" class="hover:text-white transition-colors duration-200">Inicio</NuxtLink>
            <span>/</span>
            <span class="text-white/50">Catálogos</span>
            <span>/</span>
            <span class="text-white">Automotor</span>
          </nav>

          <span class="text-brand-red text-sm font-semibold tracking-widest uppercase">Catálogo</span>
          <div class="section-sep" />
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Catálogo <span class="gradient-text">Automotor</span>
          </h1>
          <p class="text-white/50 text-base mt-3 max-w-xl">
            Resortes a gas para capots, baúles y accesos de vehículos de pasajeros.
            Equivalentes de calidad a precios competitivos.
          </p>
        </div>
      </section>

      <!-- PDF Viewer Section -->
      <section class="py-12 lg:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PdfViewer
            pdf-url="/catalogos/automotor.pdf"
            file-name="catalogo-automotor-resortes-nv.pdf"
            title="Catálogo Reposición Automotor"
          />
        </div>
      </section>

      <!-- Related links -->
      <section class="pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="border-t border-white/8 pt-10">
            <h3 class="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">Ver también</h3>
            <div class="flex flex-wrap gap-4">
              <NuxtLink
                to="/catalogo/autobuses"
                class="flex items-center gap-3 border border-white/10 bg-brand-gray hover:border-brand-red/40 hover:bg-brand-red/5 px-5 py-3 transition-all duration-200 group"
              >
                <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <div>
                  <div class="text-white text-sm font-semibold">Catálogo Autobuses</div>
                  <div class="text-white/40 text-xs">Vehículos pesados</div>
                </div>
                <svg class="w-4 h-4 text-white/30 group-hover:text-brand-red ml-2 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>

              <NuxtLink
                to="/contacto"
                class="flex items-center gap-3 border border-white/10 bg-brand-gray hover:border-brand-red/40 hover:bg-brand-red/5 px-5 py-3 transition-all duration-200 group"
              >
                <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
                <div>
                  <div class="text-white text-sm font-semibold">Consultar precios</div>
                  <div class="text-white/40 text-xs">Escribinos directamente</div>
                </div>
                <svg class="w-4 h-4 text-white/30 group-hover:text-brand-red ml-2 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
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
  title: 'Catálogo Automotor | Resortes NV',
  meta: [
    {
      name: 'description',
      content: 'Descargá el catálogo de resortes a gas para reposición automotor de Resortes NV. Equivalentes de calidad para capots, baúles y más.',
    },
  ],
})
</script>
