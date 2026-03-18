<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
let rafId: number | null = null

interface Part {
  id: string
  label: string
  assembledY: number
  explodedY: number
  width: number
  height: number
  background: string
  borderRadius: string
  isEyelet?: boolean
  isBellows?: boolean
}

const parts: Part[] = [
  {
    id: 'ojal-superior',
    label: 'Ojal Superior',
    assembledY: -265,
    explodedY: -332,
    width: 44,
    height: 48,
    background: 'linear-gradient(145deg, #5a6a7a 0%, #2e3e50 45%, #151e2a 100%)',
    borderRadius: '8px',
    isEyelet: true,
  },
  {
    id: 'cilindro',
    label: 'Cilindro Exterior',
    assembledY: -132,
    explodedY: -208,
    width: 28,
    height: 160,
    background: 'linear-gradient(90deg, #2e3e50 0%, #7a8fa0 18%, #bccedd 38%, #e8f4fc 50%, #bccedd 62%, #7a8fa0 82%, #2e3e50 100%)',
    borderRadius: '3px',
  },
  {
    id: 'camara',
    label: 'Cámara de Gas Nitrógeno',
    assembledY: -20,
    explodedY: -71,
    width: 80,
    height: 74,
    background: 'linear-gradient(90deg, #17348a 0%, #1e52c0 22%, #2e6ae0 45%, #5090f8 55%, #2e6ae0 70%, #1e52c0 83%, #17348a 100%)',
    borderRadius: '6px',
  },
  {
    id: 'piston',
    label: 'Pistón Separador',
    assembledY: 25,
    explodedY: -4,
    width: 80,
    height: 20,
    background: 'linear-gradient(90deg, #3a4a5a 0%, #8898a8 30%, #ccdae6 45%, #e6f0f8 55%, #ccdae6 70%, #8898a8 85%, #3a4a5a 100%)',
    borderRadius: '3px',
  },
  {
    id: 'aceite',
    label: 'Aceite Hidráulico',
    assembledY: 83,
    explodedY: 63,
    width: 80,
    height: 74,
    background: 'linear-gradient(90deg, #5a2e06 0%, #8a4a0e 22%, #c06810 45%, #e88a18 55%, #c06810 70%, #8a4a0e 83%, #5a2e06 100%)',
    borderRadius: '6px',
  },
  {
    id: 'sello',
    label: 'Sello de Aceite',
    assembledY: 155,
    explodedY: 157,
    width: 80,
    height: 74,
    background: 'linear-gradient(90deg, #080808 0%, #181818 25%, #242424 50%, #181818 75%, #080808 100%)',
    borderRadius: '6px',
    isBellows: true,
  },
  {
    id: 'vastago',
    label: 'Vástago Cromado',
    assembledY: 222,
    explodedY: 251,
    width: 28,
    height: 74,
    background: 'linear-gradient(90deg, #2e3e50 0%, #7a8fa0 18%, #bccedd 38%, #e8f4fc 50%, #bccedd 62%, #7a8fa0 82%, #2e3e50 100%)',
    borderRadius: '3px',
  },
  {
    id: 'ojal-inferior',
    label: 'Ojal Inferior',
    assembledY: 278,
    explodedY: 332,
    width: 44,
    height: 48,
    background: 'linear-gradient(145deg, #5a6a7a 0%, #2e3e50 45%, #151e2a 100%)',
    borderRadius: '8px',
    isEyelet: true,
  },
]

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// 0 = assembled, 1 = exploded
const explodeProgress = computed(() => {
  const p = scrollProgress.value
  if (p < 0.3) return easeInOutCubic(p / 0.3)
  if (p < 0.7) return 1
  return 1 - easeInOutCubic((p - 0.7) / 0.3)
})

const labelOpacity = computed(() => {
  const ep = explodeProgress.value
  return Math.max(0, Math.min(1, (ep - 0.25) / 0.35))
})

const springOpacity = computed(() =>
  Math.max(0, 1 - explodeProgress.value * 2.5)
)

const scrollHintOpacity = computed(() =>
  Math.max(0, 1 - scrollProgress.value * 12)
)


const bgStyle = computed(() => {
  const ep = explodeProgress.value
  const r = 10
  const g = Math.round(lerp(10, 20, ep))
  const b = Math.round(lerp(10, 38, ep))
  const r2 = 6
  const g2 = Math.round(lerp(6, 12, ep))
  const b2 = Math.round(lerp(6, 28, ep))
  return {
    background: `linear-gradient(160deg, rgb(${r},${g},${b}) 0%, rgb(${r2},${g2},${b2}) 100%)`,
  }
})

// Staggered explode: top parts move first, bottom parts follow
function getPartExplodeProgress(index: number): number {
  const staggerOffset = (index / (parts.length - 1)) * 0.1
  const adjusted = Math.max(0, (explodeProgress.value - staggerOffset) / (1 - staggerOffset))
  return Math.min(1, adjusted)
}

function getCurrentY(part: Part, index: number): number {
  return lerp(part.assembledY, part.explodedY, getPartExplodeProgress(index))
}

function partStyle(part: Part, index: number) {
  const y = getCurrentY(part, index)
  const ep = getPartExplodeProgress(index)
  const glow = part.isBellows ? '' : `, 0 0 ${Math.round(ep * 18)}px rgba(255,255,255,0.04)`
  return {
    position: 'absolute' as const,
    width: `${part.width}px`,
    height: `${part.height}px`,
    left: '50%',
    top: '50%',
    marginLeft: `-${part.width / 2}px`,
    marginTop: `-${part.height / 2}px`,
    transform: `translateY(${y}px)`,
    background: part.background,
    borderRadius: part.borderRadius,
    zIndex: index + 1,
    boxShadow: `0 6px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)${glow}`,
  }
}

function labelStyle(part: Part, index: number) {
  const y = getCurrentY(part, index)
  const delay = index * 0.05
  const individualOpacity = Math.max(
    0, Math.min(1, (explodeProgress.value - 0.15 - delay) / 0.3)
  )
  return {
    position: 'absolute' as const,
    left: 'calc(50% + 50px)',
    top: '50%',
    transform: `translateY(calc(${y}px - 50%))`,
    opacity: individualOpacity,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none' as const,
    zIndex: 20,
  }
}

const bracketTop = computed(() => getCurrentY(parts[0], 0) - parts[0].height / 2)
const bracketBottom = computed(() =>
  getCurrentY(parts[parts.length - 1], parts.length - 1) + parts[parts.length - 1].height / 2
)
const bracketHeight = computed(() => Math.max(0, bracketBottom.value - bracketTop.value))

function onScroll() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    if (!sectionRef.value) return
    const rect = sectionRef.value.getBoundingClientRect()
    const totalScrollable = sectionRef.value.offsetHeight - window.innerHeight
    const scrolled = -rect.top
    scrollProgress.value = Math.max(0, Math.min(1, scrolled / totalScrollable))
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section ref="sectionRef" style="position: relative; height: 320vh">
    <div class="sticky top-0 overflow-hidden" style="height: 100vh">

      <!-- Animated background -->
      <div class="absolute inset-0" :style="bgStyle" />

      <!-- Subtle blueprint grid (fades in during explosion) -->
      <div
        class="absolute inset-0 pointer-events-none"
        :style="{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: explodeProgress,
        }"
      />

      <!-- Section title -->
      <div class="absolute top-10 left-0 right-0 text-center" style="z-index: 30">
        <p class="text-xs text-white/40 tracking-[0.4em] uppercase mb-2">
          Ingeniería de Alto Rendimiento
        </p>
        <h2 class="text-2xl md:text-4xl font-bold text-white/90 tracking-[0.15em] uppercase">
          Anatomía del Amortiguador
        </h2>
        <div
          class="mx-auto mt-3"
          style="width: 48px; height: 2px; background: linear-gradient(90deg, #39d353, #6ee37a)"
          :style="{ opacity: 0.7 + explodeProgress * 0.3 }"
        />
      </div>

      <!-- Left measurement bracket (visible when exploded) -->
      <div
        class="absolute hidden md:block"
        :style="{
          left: 'calc(50% - 82px)',
          top: '50%',
          transform: `translateY(${bracketTop}px)`,
          width: '1px',
          height: `${bracketHeight}px`,
          background: 'rgba(57, 211, 83, 0.2)',
          opacity: labelOpacity,
          zIndex: 5,
        }"
      >
        <div style="position:absolute; top:-1px; left:-5px; width:11px; height:1px; background:rgba(57,211,83,0.4)" />
        <div style="position:absolute; bottom:-1px; left:-5px; width:11px; height:1px; background:rgba(57,211,83,0.4)" />
      </div>

      <!-- Spring overlay (assembled state) -->
      <div
        :style="{
          position: 'absolute',
          width: '86px',
          height: '242px',
          left: '50%',
          top: '50%',
          marginLeft: '-43px',
          marginTop: '-121px',
          transform: 'translateY(62px)',
          borderRadius: '5px',
          opacity: springOpacity,
          background: 'repeating-linear-gradient(0deg, #080808 0px, #161616 2px, #1e1e1e 5px, #141414 8px, #0a0a0a 11px)',
          boxShadow: 'inset 3px 0 10px rgba(255,255,255,0.04), inset -4px 0 14px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)',
          zIndex: 15,
          pointerEvents: 'none',
        }"
      />

      <!-- Parts -->
      <div
        v-for="(part, index) in parts"
        :key="part.id"
        :style="partStyle(part, index)"
      >
        <!-- Eyelet bolt hole -->
        <div
          v-if="part.isEyelet"
          :style="{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '14px',
            height: '14px',
            background: '#06080c',
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.18)',
            zIndex: 2,
          }"
        />
        <!-- Eyelet chrome rim -->
        <div
          v-if="part.isEyelet"
          :style="{
            position: 'absolute',
            inset: '0',
            borderRadius: part.borderRadius,
            border: '1.5px solid rgba(255,255,255,0.12)',
            boxSizing: 'border-box',
          }"
        />
        <!-- Bellows / seal lines -->
        <template v-if="part.isBellows">
          <div
            v-for="i in 8"
            :key="i"
            :style="{
              position: 'absolute',
              left: '0',
              right: '0',
              top: `${(i / 9) * 100}%`,
              height: '1px',
              background: 'rgba(255,255,255,0.09)',
            }"
          />
        </template>
      </div>

      <!-- Labels (hidden on small screens) -->
      <div
        v-for="(part, index) in parts"
        :key="`label-${part.id}`"
        class="hidden md:flex"
        :style="labelStyle(part, index)"
      >
        <div
          style="width:60px; height:1px; background:rgba(255,255,255,0.22); flex-shrink:0; margin-right:10px;"
        />
        <span
          style="color:rgba(255,255,255,0.85); font-size:12px; font-weight:300; letter-spacing:0.12em; white-space:nowrap; font-family:'Inter',sans-serif;"
        >
          {{ part.label }}
        </span>
      </div>

      <!-- Scroll hint -->
      <div
        class="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
        :style="{ opacity: scrollHintOpacity, zIndex: 30 }"
      >
        <p class="text-white/30 text-xs tracking-[0.35em] uppercase">
          Scroll para explorar
        </p>
        <div
          style="width:1px; height:28px; background: linear-gradient(to bottom, rgba(57,211,83,0.5), transparent);"
        />
      </div>

    </div>
  </section>
</template>
