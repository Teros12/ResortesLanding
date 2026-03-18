<template>
  <section id="mercados" class="relative py-24 lg:py-32 bg-brand-black overflow-hidden">
    <!-- Subtle background decoration -->
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div ref="headerRef" class="animate-on-scroll mb-16">
        <span class="text-brand-red text-sm font-semibold tracking-widest uppercase">Nuestros Mercados</span>
        <div class="section-sep" />
        <h2 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl">
          Diseñados para elevar<br>
          <span class="gradient-text">cada aplicación.</span>
        </h2>
      </div>

      <!-- Cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="(card, index) in cards"
          :key="card.title"
          :to="card.link"
          :ref="el => cardRefs[index] = el as any"
          class="card-market animate-on-scroll bg-brand-gray border border-white/8 overflow-hidden flex flex-col cursor-pointer group"
          :style="`transition-delay: ${index * 100}ms`"
        >
          <!-- Card visual: CSS gradient + SVG icon -->
          <div :class="`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${card.gradient} flex items-center justify-center`">
            <!-- Decorative grid lines -->
            <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 24px 24px;" />
            <!-- Rotating diamond decoration -->
            <div class="absolute right-4 bottom-4 w-16 h-16 border border-white/10 rotate-45" />
            <!-- SVG icon -->
            <div
              class="card-img relative z-10 w-24 h-24 text-white/20"
              v-html="card.icon"
            />
            <!-- Gradient overlay bottom -->
            <div class="absolute inset-0 bg-gradient-to-t from-brand-gray via-transparent to-transparent opacity-90" />
            <!-- Category badge -->
            <div class="absolute top-3 left-3 z-10">
              <span class="inline-block px-2 py-1 bg-brand-red/90 text-white text-xs font-semibold tracking-wide">
                {{ card.category }}
              </span>
            </div>
          </div>

          <!-- Card body -->
          <div class="flex flex-col flex-1 p-6">
            <h3 class="text-white font-bold text-lg mb-2 leading-tight">{{ card.title }}</h3>
            <p class="text-white/50 text-sm leading-relaxed mb-5 flex-1">{{ card.description }}</p>

            <!-- CTA -->
            <span class="inline-flex items-center gap-2 text-sm font-semibold text-brand-red group-hover:text-white transition-colors duration-200 mt-auto">
              {{ card.cta }}
              <svg
                class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const headerRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

const cards = [
  {
    title: 'Reposición Automotor',
    category: 'Automotor',
    description: 'Soluciones confiables para capots, baúles y accesos esenciales.',
    link: '/catalogo/automotor',
    cta: 'Ver Catálogo',
    gradient: 'from-[#2a0a10] to-[#1a0508]',
    icon: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 38l5-14h34l5 14H10z"/><path d="M6 38h52v8H6z"/><circle cx="18" cy="48" r="5"/><circle cx="46" cy="48" r="5"/><path d="M22 24h10l3 8H22z"/><path d="M35 24h8l2 8h-7z"/><path d="M6 38v4"/><path d="M58 38v4"/></svg>`,
  },
  {
    title: 'Vehículos Pesados',
    category: 'Autobuses',
    description: 'Camiones y colectivos, diseñados para esfuerzos superiores.',
    link: '/catalogo/autobuses',
    cta: 'Ver Catálogo',
    gradient: 'from-[#0a1828] to-[#060e18]',
    icon: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="18" width="42" height="26" rx="2"/><path d="M46 26h10a2 2 0 012 2v12a2 2 0 01-2 2h-10"/><circle cx="14" cy="46" r="4"/><circle cx="34" cy="46" r="4"/><circle cx="52" cy="46" r="4"/><path d="M4 28h42"/><path d="M16 18v10M28 18v10M40 18v10"/><path d="M4 36h42"/></svg>`,
  },
  {
    title: 'Aplicaciones Agrícolas',
    category: 'Agrícola',
    description: 'Todo tipo de portones de maquinaria agrícola, diseñados para durar.',
    link: '/contacto',
    cta: 'Consultar',
    gradient: 'from-[#0e1f0a] to-[#081408]',
    icon: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="28" width="32" height="20" rx="2"/><rect x="38" y="20" width="20" height="28" rx="2"/><circle cx="14" cy="50" r="5"/><circle cx="30" cy="50" r="5"/><circle cx="48" cy="50" r="5"/><path d="M6 36h32"/><path d="M38 28h20"/><path d="M22 28v-8a6 6 0 016-6h10"/></svg>`,
  },
  {
    title: 'Desarrollos a Medida',
    category: 'Industrial',
    description: 'Soluciones personalizadas para proyectos industriales.',
    link: '/contacto',
    cta: 'Consultar',
    gradient: 'from-[#201408] to-[#140c04]',
    icon: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="32" cy="32" r="10"/><circle cx="32" cy="32" r="3"/><line x1="32" y1="8" x2="32" y2="16"/><line x1="32" y1="48" x2="32" y2="56"/><line x1="8" y1="32" x2="16" y2="32"/><line x1="48" y1="32" x2="56" y2="32"/><line x1="15.5" y1="15.5" x2="21.5" y2="21.5"/><line x1="42.5" y1="42.5" x2="48.5" y2="48.5"/><line x1="48.5" y1="15.5" x2="42.5" y2="21.5"/><line x1="21.5" y1="42.5" x2="15.5" y2="48.5"/></svg>`,
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
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  )

  if (headerRef.value) observer.observe(headerRef.value)
  cardRefs.value.forEach(el => {
    if (!el) return
    // If it's a Vue component (like NuxtLink), use .$el. Otherwise use the element directly.
    const domNode = (el as any).$el || el
    if (domNode instanceof Element) {
      observer.observe(domNode)
    }
  })

  onUnmounted(() => observer.disconnect())
})
</script>
