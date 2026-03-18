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
          <!-- Card visual: Realistic grayscale image + shapes -->
          <div class="relative aspect-[4/3] overflow-hidden flex items-center justify-center bg-[#111]">
            <!-- Background Image -->
            <img
              :src="card.image"
              :alt="card.title"
              class="absolute inset-0 w-full h-full object-cover grayscale opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
            />
            
            <!-- Decorative Shapes Overlay -->
            <img
              src="https://resortesnv.com.ar/wp-content/uploads/nv-shapes.png"
              alt=""
              class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen pointer-events-none group-hover:opacity-100 transition-opacity duration-500"
            />

            <!-- Gradient overlay bottom to blend with the card background -->
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
    image: 'https://resortesnv.com.ar/wp-content/uploads/nv-auto-01.jpg',
  },
  {
    title: 'Vehículos Pesados',
    category: 'Pesados',
    description: 'Camiones y colectivos, diseñados para esfuerzos superiores.',
    link: '/catalogo/autobuses',
    cta: 'Ver Catálogo',
    image: 'https://resortesnv.com.ar/wp-content/uploads/nv-pesado-01.jpg',
  },
  {
    title: 'Aplicaciones Agrícolas',
    category: 'Agrícola',
    description: 'Todo tipo de portones de maquinaria agrícola, diseñados para durar.',
    link: '/contacto',
    cta: 'Consultar',
    image: 'https://resortesnv.com.ar/wp-content/uploads/nv-agro-02.jpg',
  },
  {
    title: 'Desarrollos a Medida',
    category: 'Industrial',
    description: 'Soluciones personalizadas para proyectos industriales.',
    link: '/contacto',
    cta: 'Consultar',
    image: 'https://resortesnv.com.ar/wp-content/uploads/nv-varios-02.jpg',
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
