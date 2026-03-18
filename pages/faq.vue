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
          <span class="text-brand-red text-sm font-semibold tracking-widest uppercase">Soporte</span>
          <div class="section-sep" />
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Preguntas<br>
            <span class="gradient-text">Frecuentes</span>
          </h1>
          <p class="text-white/50 text-lg mt-4 max-w-xl">
            Todo lo que necesitás saber sobre nuestros productos y cómo trabajamos.
          </p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 lg:py-24">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="space-y-3">
            <div
              v-for="(item, index) in faqs"
              :key="index"
              class="border border-white/8 bg-brand-gray overflow-hidden animate-on-scroll"
              :ref="el => faqRefs[index] = el as HTMLElement"
              :style="`transition-delay: ${index * 60}ms`"
            >
              <!-- Question header -->
              <button
                class="w-full flex items-center justify-between p-6 text-left hover:bg-white/3 transition-colors duration-200 group"
                :aria-expanded="openItems[index]"
                @click="toggle(index)"
              >
                <span class="text-white font-semibold text-base pr-4 leading-snug">
                  {{ item.question }}
                </span>
                <span
                  class="flex-shrink-0 w-7 h-7 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-brand-red/50"
                  :class="openItems[index] ? 'bg-brand-red border-brand-red rotate-45' : ''"
                >
                  <svg
                    class="w-3.5 h-3.5 text-white transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14m-7-7h14"/>
                  </svg>
                </span>
              </button>

              <!-- Answer -->
              <div class="accordion-content" :class="{ 'is-open': openItems[index] }">
                <div class="px-6 pb-6">
                  <div class="w-8 h-px bg-brand-red/50 mb-4" />
                  <p class="text-white/60 text-sm leading-relaxed">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA at bottom -->
          <div
            ref="ctaRef"
            class="animate-on-scroll mt-16 p-8 border border-brand-red/20 bg-brand-red/5 text-center"
          >
            <svg class="w-8 h-8 text-brand-red mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="text-white font-bold text-xl mb-2">¿Tenés otra pregunta?</h3>
            <p class="text-white/50 text-sm mb-6">
              Nuestro equipo está disponible para responder todas tus consultas.
            </p>
            <NuxtLink to="/contacto" class="btn-primary inline-flex group">
              Escribinos
              <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'FAQ – Preguntas Frecuentes | Resortes NV',
  meta: [
    {
      name: 'description',
      content: 'Respondemos las preguntas más frecuentes sobre resortes a gas, garantías, distribución y pedidos a medida de Resortes NV.',
    },
  ],
})

const faqs = [
  {
    question: '¿Qué es un resorte a gas?',
    answer:
      'También conocido como amortiguador a gas, pistón a gas o cilindro neumático. Es un dispositivo que facilita la apertura y sostén de tapas o compuertas mediante la acción de su contenido de gas inerte presurizado y aceite.',
  },
  {
    question: '¿Los resortes NV reemplazan a los originales?',
    answer:
      'Sí. Con las mismas dimensiones y fuerza, NV produce equivalentes de igual o mayor desempeño a precios más competitivos.',
  },
  {
    question: '¿Ofrecen garantía?',
    answer:
      'Todos nuestros productos tienen garantía de fábrica por fallas y soporte directo desde nuestra planta en Rosario.',
  },
  {
    question: '¿Qué margen comercial tiene un distribuidor NV?',
    answer:
      'Nuestros esquemas de precios permiten un margen atractivo, competitivo frente al repuesto original. Para más detalles, contactate directamente con nuestro equipo comercial.',
  },
  {
    question: '¿Hay mínimos de compra o exclusividad por zona?',
    answer:
      'Dependiendo de la región y el volumen, se pueden establecer condiciones preferenciales. Consultá con nuestro equipo para conocer las opciones disponibles en tu zona.',
  },
  {
    question: '¿Puedo solicitar resortes a medida?',
    answer:
      'Sí. Somos fabricantes y podemos desarrollar modelos específicos según tipo de vehículo o requerimiento. Contactanos con los datos técnicos de lo que necesitás.',
  },
]

const openItems = ref<boolean[]>(faqs.map(() => false))
const faqRefs = ref<HTMLElement[]>([])
const ctaRef = ref<HTMLElement | null>(null)

function toggle(index: number) {
  openItems.value[index] = !openItems.value[index]
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  faqRefs.value.forEach(el => el && observer.observe(el))
  if (ctaRef.value) observer.observe(ctaRef.value)

  onUnmounted(() => observer.disconnect())
})
</script>
