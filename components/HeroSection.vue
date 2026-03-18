<template>
  <section class="relative min-h-screen flex items-center overflow-hidden bg-brand-black">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-[#051a08]" />

    <!-- Grid lines decoration -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;" />
    </div>

    <!-- Animated geometric shapes -->
    <div class="absolute right-0 top-0 w-full h-full pointer-events-none overflow-hidden">
      <!-- Large rotating diamond -->
      <div
        class="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-brand-red/10"
        style="animation: rotateSlow 80s linear infinite; transform-origin: center center;"
      />
      <!-- Medium rotating diamond -->
      <div
        class="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-brand-red/8"
        style="animation: rotateSlow 50s linear infinite reverse; transform-origin: center center;"
      />
      <!-- Small diamond -->
      <div
        class="absolute right-[50px] top-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-brand-red/15 rotate-45"
        style="animation: rotateSlow 30s linear infinite; transform-origin: center center;"
      />
      <!-- Red glow blob -->
      <div class="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px]" />
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <div class="max-w-3xl">
        <!-- Badge -->
        <div
          ref="badge"
          class="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-red/30 bg-brand-red/5 mb-8"
          :class="{ 'animate-fade-in': mounted }"
          style="animation-delay: 0ms;"
        >
          <span class="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
          <span class="text-brand-red text-xs font-medium tracking-widest uppercase">Fabricado en Argentina desde 1988</span>
        </div>

        <!-- Headline -->
        <h1 class="hero-title text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
          <span
            class="block text-white opacity-0"
            :class="{ 'animate-slide-up': mounted }"
            style="animation-delay: 100ms; animation-fill-mode: forwards;"
          >
            Resortes a gas
          </span>
          <span
            class="block opacity-0"
            :class="{ 'animate-slide-up': mounted }"
            style="animation-delay: 200ms; animation-fill-mode: forwards;"
          >
            <span class="gradient-text">para vehículos.</span>
          </span>
        </h1>

        <!-- Subheadline -->
        <p
          class="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl opacity-0"
          :class="{ 'animate-slide-up': mounted }"
          style="animation-delay: 350ms; animation-fill-mode: forwards;"
        >
          Eleva lo cotidiano. Desde 1988, fabricamos en Argentina la opción más confiable
          para el mercado de reposición.
        </p>

        <!-- CTAs -->
        <div
          class="flex flex-wrap gap-4 opacity-0"
          :class="{ 'animate-slide-up': mounted }"
          style="animation-delay: 500ms; animation-fill-mode: forwards;"
        >
          <NuxtLink to="/contacto" class="btn-primary group">
            Solicita el Catálogo
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
          <NuxtLink to="/contacto" class="btn-secondary group">
            Distribución
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>

        <!-- Stats row -->
        <div
          class="flex flex-wrap gap-8 mt-16 pt-10 border-t border-white/8 opacity-0"
          :class="{ 'animate-fade-in': mounted }"
          style="animation-delay: 700ms; animation-fill-mode: forwards;"
        >
          <div>
            <div class="text-4xl font-black text-white">+35</div>
            <div class="text-white/40 text-sm mt-1">años de experiencia</div>
          </div>
          <div>
            <div class="text-4xl font-black text-white">3ª</div>
            <div class="text-white/40 text-sm mt-1">generación familiar</div>
          </div>
          <div>
            <div class="text-4xl font-black text-white">100%</div>
            <div class="text-white/40 text-sm mt-1">fabricación nacional</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <span class="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
      <div class="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
    </div>
  </section>
</template>

<script setup lang="ts">
const mounted = ref(false)

onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)
})
</script>

<style scoped>
@keyframes rotateSlow {
  from { transform: translateY(-50%) rotate(0deg); }
  to { transform: translateY(-50%) rotate(360deg); }
}
</style>
