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

      <!-- Action Buttons -->
      <div class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <button 
            @click="createLink"
            class="romantic-button text-xl font-romantic animate-heart-beat"
          >
            Create Link for Someone 💕
          </button>
          
          <button 
            @click="startApplication"
            class="bg-white/70 text-warm-coral border-2 border-warm-coral font-semibold py-3 px-8 rounded-full hover:bg-warm-coral hover:text-white transition-all duration-300 text-xl font-romantic"
          >
            Fill Out Application ✨
          </button>
        </div>
        
        <p class="text-sm text-gray-500 italic">
          *Create a link to send to someone special, or fill out an application yourself!*
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

const createLink = () => {
  router.push('/create')
}
</script>
