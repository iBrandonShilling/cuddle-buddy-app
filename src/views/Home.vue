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
        <button 
          @click="startApplication"
          class="romantic-button text-2xl font-romantic animate-heart-beat w-full"
        >
          Start My Application ✨
        </button>
        
        <!-- Quick Link Creator -->
        <div class="bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-2xl p-6">
          <h3 class="text-lg font-elegant text-warm-coral mb-4 text-center">
            💌 Send to Someone Special
          </h3>
          <div class="space-y-3">
            <input 
              v-model="quickEmail"
              type="email" 
              class="romantic-input text-sm"
              placeholder="Enter your email to receive their results"
            />
            <button 
              @click="createQuickLink"
              :disabled="!quickEmail"
              class="w-full bg-white/70 text-warm-coral border-2 border-warm-coral font-semibold py-2 px-4 rounded-full hover:bg-warm-coral hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📧 Generate Link to Send
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-2 text-center">
            They'll fill it out and you'll get their results! 💕
          </p>
          
          <!-- Generated Link Display -->
          <div v-if="showLink" class="mt-4 bg-white/70 rounded-xl p-4">
            <p class="text-sm text-gray-600 mb-2 text-center">Your special link:</p>
            <div class="bg-gray-100 rounded-lg p-2 font-mono text-xs break-all mb-3">
              {{ generatedLink }}
            </div>
            <button 
              @click="copyQuickLink"
              class="w-full bg-warm-coral text-white font-semibold py-2 px-4 rounded-full hover:bg-warm-coral/80 transition-all duration-300"
            >
              📋 Copy Link
            </button>
          </div>
        </div>
        
        <p class="text-sm text-gray-500 italic">
          *Perfect for asking someone to be your cuddle buddy in a cute way!*
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const quickEmail = ref('')
const generatedLink = ref('')
const showLink = ref(false)

const startApplication = () => {
  router.push('/apply')
}

const createQuickLink = () => {
  if (!quickEmail.value) return
  
  // Simple base64 encoding for the email (not super secure but better than plain text)
  const encodedEmail = btoa(quickEmail.value)
  const baseUrl = window.location.origin
  const link = `${baseUrl}/apply?c=${encodedEmail}`
  
  generatedLink.value = link
  showLink.value = true
}

const copyQuickLink = async () => {
  try {
    await navigator.clipboard.writeText(generatedLink.value)
    alert('Link copied! 💕 Send it to your special someone!')
  } catch (error) {
    // Fallback
    const textArea = document.createElement('textarea')
    textArea.value = generatedLink.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Link copied! 💕')
  }
}
</script>
