<template>
  <div class="min-h-screen bg-brand-black">
    <AppHeader />
    <main>
      <HeroSection />
      <MercadosSection />
      <ShockAbsorberSection />
      <EmpresaSection />
      <DistribuidorSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Resortes NV – Fabricantes de resortes a gas en Argentina',
  meta: [
    {
      name: 'description',
      content: 'Desde 1988, Resortes NV fabrica en Argentina resortes a gas, regulables y amortiguadores para automotor, vehículos pesados, agrícola e industrial.',
    },
  ],
})
</script>
