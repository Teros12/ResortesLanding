// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
    preload: true,
  },

  image: {
    domains: ['resortesnv.com.ar'],
    format: ['webp', 'jpg'],
  },

  app: {
    head: {
      title: 'Resortes NV – Fabricantes de resortes a gas en Argentina',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Desde 1988, Resortes NV fabrica en Argentina resortes a gas, regulables y amortiguadores para automotor, vehículos pesados, aplicaciones agrícolas e industriales.',
        },
        { property: 'og:title', content: 'Resortes NV – Fabricantes de resortes a gas en Argentina' },
        {
          property: 'og:description',
          content: 'Desde 1988, Resortes NV fabrica en Argentina resortes a gas, regulables y amortiguadores para automotor, vehículos pesados, aplicaciones agrícolas e industriales.',
        },
        { property: 'og:image', content: 'https://resortesnv.com.ar/wp-content/uploads/NV-logo.svg' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://resortesnv.com.ar' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: 'https://resortesnv.com.ar/wp-content/uploads/NV-logo.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    optimizeDeps: {
      include: ['pdfjs-dist'],
    },
  },

  build: {
    transpile: ['pdfjs-dist'],
  },

  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config.js',
    exposeConfig: false,
  },
})
