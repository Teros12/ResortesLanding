<template>
  <section id="empresa" class="relative py-24 lg:py-32 bg-[#0d0d0d] overflow-hidden">
    <!-- Decorative shapes -->
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    <div class="absolute -left-32 top-1/2 w-64 h-64 border border-brand-red/10 rotate-45 pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Text column -->
        <div ref="textRef" class="animate-on-scroll-left">
          <span class="text-brand-red text-sm font-semibold tracking-widest uppercase">Nuestra empresa</span>
          <div class="section-sep" />
          <h2 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Más de
            <span class="gradient-text">{{ displayedYears }} años</span>,<br>
            pioneros en Argentina
          </h2>
          <p class="text-white/60 text-lg leading-relaxed mb-8">
            Desde nuestra planta en Rosario, fabricamos resortes a gas, regulables y amortiguadores.
            3ra generación de expertos en elevar aplicaciones, con la mejor relación costo-beneficio del mercado.
          </p>

          <!-- Feature list -->
          <ul class="space-y-4 mb-10">
            <li v-for="feat in features" :key="feat.text" class="flex items-start gap-3">
              <div class="flex-shrink-0 w-5 h-5 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center mt-0.5">
                <svg class="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span class="text-white/70 text-sm leading-relaxed">{{ feat.text }}</span>
            </li>
          </ul>

          <NuxtLink to="/contacto" class="btn-primary inline-flex group">
            Contáctanos
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>

        <!-- Images column -->
        <div ref="imagesRef" class="animate-on-scroll-right">
          <div class="relative">
            <!-- Main image -->
            <div class="relative overflow-hidden image-reveal" ref="img1Ref">
              <img
                src="https://resortesnv.com.ar/wp-content/uploads/nv-empresa-01.jpg"
                alt="Planta de fabricación Resortes NV"
                class="w-full h-80 lg:h-96 object-cover"
                loading="lazy"
              />
              <!-- Red accent line -->
              <div class="absolute bottom-0 left-0 w-1/3 h-1 bg-brand-red" />
            </div>

            <!-- Secondary image (overlapping) -->
            <div
              class="relative -mt-12 ml-12 sm:ml-24 overflow-hidden border-4 border-brand-black image-reveal"
              ref="img2Ref"
              style="transition-delay: 200ms;"
            >
              <img
                src="https://resortesnv.com.ar/wp-content/uploads/resortes.jpg"
                alt="Resortes NV productos"
                class="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>

            <!-- Experience badge -->
            <div class="absolute -left-4 sm:-left-8 top-8 bg-brand-red p-5 shadow-2xl">
              <div class="text-white text-3xl font-black leading-none">{{ displayedYears }}+</div>
              <div class="text-white/80 text-xs font-medium mt-1 leading-tight">años de<br>experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const textRef = ref<HTMLElement | null>(null)
const imagesRef = ref<HTMLElement | null>(null)
const img1Ref = ref<HTMLElement | null>(null)
const img2Ref = ref<HTMLElement | null>(null)
const displayedYears = ref(0)
const targetYears = 35

const features = [
  { text: 'Fabricación 100% nacional en nuestra planta de Rosario, Santa Fe.' },
  { text: 'Equivalentes de igual o mayor desempeño que los originales a menor costo.' },
  { text: 'Cobertura nacional con distribuidores en todo el país.' },
  { text: 'Desarrollos a medida para necesidades específicas de cada cliente.' },
]

function animateCounter() {
  let start = 0
  const duration = 1500
  const step = (targetYears / duration) * 16
  const timer = setInterval(() => {
    start += step
    if (start >= targetYears) {
      displayedYears.value = targetYears
      clearInterval(timer)
    } else {
      displayedYears.value = Math.floor(start)
    }
  }, 16)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          if (entry.target === textRef.value && displayedYears.value === 0) {
            animateCounter()
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  const targets = [textRef.value, imagesRef.value, img1Ref.value, img2Ref.value]
  targets.forEach(el => el && observer.observe(el))

  onUnmounted(() => observer.disconnect())
})
</script>
