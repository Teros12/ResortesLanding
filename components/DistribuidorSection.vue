<template>
  <section class="relative py-24 overflow-hidden bg-brand-black">
    <!-- Background: dark gradient with red accent -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#051a08] via-brand-black to-[#0a0a0a]" />
    <!-- Red glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/8 rounded-full filter blur-[150px] pointer-events-none" />
    <!-- Top border accent -->
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
    <!-- Bottom border accent -->
    <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />

    <!-- Geometric decorations -->
    <div class="absolute right-8 top-8 w-32 h-32 border border-brand-red/20 rotate-45 pointer-events-none" />
    <div class="absolute left-8 bottom-8 w-20 h-20 border border-brand-red/15 rotate-12 pointer-events-none" />
    <div class="absolute right-1/4 bottom-12 w-16 h-16 border border-white/5 -rotate-12 pointer-events-none" />

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div ref="sectionRef" class="animate-on-scroll">
        <!-- Icon -->
        <div class="inline-flex items-center justify-center w-16 h-16 border border-brand-red/30 bg-brand-red/10 mb-8 mx-auto">
          <svg class="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        </div>

        <!-- Eyebrow -->
        <p class="text-brand-red text-sm font-semibold tracking-widest uppercase mb-4">
          Oportunidad de negocio
        </p>

        <!-- Headline -->
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Eleva tus márgenes.<br>
          <span class="gradient-text">Eleva tu mundo.</span>
        </h2>

        <!-- Subheadline -->
        <p class="text-xl sm:text-2xl text-white/70 font-medium mb-4">
          Sea distribuidor de Resortes NV en su zona
        </p>

        <!-- Body text -->
        <p class="text-white/50 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Comercialmente ventajosos, nuestros productos brindan la mejor relación
          costo beneficio del mercado. Sumá una línea de productos de calidad
          nacional con respaldo directo de fábrica.
        </p>

        <!-- Benefits -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div
            v-for="(benefit, i) in benefits"
            :key="benefit.title"
            class="border border-white/8 bg-white/3 p-5 text-left animate-on-scroll"
            :style="`transition-delay: ${(i + 1) * 100}ms`"
            :ref="el => benefitRefs[i] = el as HTMLElement"
          >
            <div class="text-brand-red mb-2">
              <component :is="'div'" v-html="benefit.icon" />
            </div>
            <div class="text-white font-semibold text-sm mb-1">{{ benefit.title }}</div>
            <div class="text-white/40 text-xs leading-relaxed">{{ benefit.desc }}</div>
          </div>
        </div>

        <!-- CTA -->
        <NuxtLink to="/contacto" class="btn-primary text-base px-8 py-4 group">
          Quiero más información
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const benefitRefs = ref<HTMLElement[]>([])

const benefits = [
  {
    title: 'Margen atractivo',
    desc: 'Esquemas de precios competitivos frente al repuesto original.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  },
  {
    title: 'Respaldo de fábrica',
    desc: 'Soporte técnico y garantía directa del fabricante.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  },
  {
    title: 'Zona exclusiva',
    desc: 'Condiciones preferenciales según región y volumen.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.15 }
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
  benefitRefs.value.forEach(el => el && observer.observe(el))

  onUnmounted(() => observer.disconnect())
})
</script>
