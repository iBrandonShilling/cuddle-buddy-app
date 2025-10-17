<template>
  <div id="app" class="min-h-screen relative">
    <!-- Floating Hearts Background -->
    <div class="floating-hearts">
      <div class="heart" style="left: 10%; animation-delay: 0s;">💕</div>
      <div class="heart" style="left: 20%; animation-delay: 1s;">💖</div>
      <div class="heart" style="left: 30%; animation-delay: 2s;">💗</div>
      <div class="heart" style="left: 40%; animation-delay: 3s;">💝</div>
      <div class="heart" style="left: 50%; animation-delay: 4s;">💘</div>
      <div class="heart" style="left: 60%; animation-delay: 5s;">💕</div>
      <div class="heart" style="left: 70%; animation-delay: 6s;">💖</div>
      <div class="heart" style="left: 80%; animation-delay: 7s;">💗</div>
      <div class="heart" style="left: 90%; animation-delay: 8s;">💝</div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Add some romantic sparkle effects
  document.body.style.overflow = 'hidden'
  setTimeout(() => {
    document.body.style.overflow = 'auto'
  }, 1000)
})
</script>
