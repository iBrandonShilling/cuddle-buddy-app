<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="romantic-card max-w-2xl w-full p-8 text-center">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-6xl font-romantic text-warm-coral mb-4 animate-pulse-soft">
          💕 Cuddle Buddy Application 💕
        </h1>
        <p class="text-xl text-gray-700 font-elegant">
          Someone special wants to be your cuddle buddy! 
        </p>
        <p class="text-lg text-gray-600 mt-2">
          Fill out this adorable application to see if you're a perfect match 💖
        </p>
      </div>

      <!-- Cute Illustration -->
      <div class="mb-8">
        <div class="text-8xl animate-float">🐻</div>
        <div class="text-6xl animate-float" style="animation-delay: 1s;">💕</div>
        <div class="text-8xl animate-float" style="animation-delay: 2s;">🐰</div>
      </div>

      <!-- Start Button -->
      <div class="space-y-4">
        <button 
          @click="startApplication"
          class="romantic-button text-2xl font-romantic animate-heart-beat"
        >
          Start My Application ✨
        </button>
        
        <p class="text-sm text-gray-500 italic">
          *This application is completely anonymous and fun!*
        </p>
      </div>

      <!-- Romantic Quote -->
      <div class="mt-12 p-6 bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-2xl">
        <p class="text-lg font-elegant italic text-gray-700">
          "The best cuddles are the ones that make you forget about everything else in the world."
        </p>
        <p class="text-sm text-gray-500 mt-2">- Anonymous Cuddle Expert</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startApplication = () => {
  router.push('/apply')
}
</script>
