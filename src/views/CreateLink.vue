<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="romantic-card max-w-2xl w-full p-8 text-center">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-6xl font-romantic text-warm-coral mb-4 animate-pulse-soft">
          💕 Create Your Cuddle Buddy Link 💕
        </h1>
        <p class="text-xl text-gray-700 font-elegant">
          Create a special link to send to someone you'd like to cuddle with!
        </p>
        <p class="text-lg text-gray-600 mt-2">
          When they fill it out, you'll get their results! 💖
        </p>
      </div>

      <!-- Cute Illustration -->
      <div class="mb-8">
        <div class="text-8xl animate-float mb-4">💌</div>
        <div class="text-6xl animate-float" style="animation-delay: 1s;">💕</div>
        <div class="text-8xl animate-float" style="animation-delay: 2s;">📧</div>
      </div>

      <!-- Form -->
      <form @submit.prevent="createLink" class="space-y-6">
        <div class="bg-white/50 rounded-2xl p-6">
          <h2 class="text-2xl font-elegant text-warm-coral mb-6 text-center">
            📧 Your Email Address
          </h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Where should we send their results?</label>
            <input 
              v-model="creatorEmail"
              type="email" 
              class="romantic-input"
              placeholder="your.email@example.com"
              required
            />
            <p class="text-sm text-gray-500 mt-2">
              This is where you'll receive their cuddle buddy application results! 💕
            </p>
          </div>
        </div>

        <!-- Cute Validation Message -->
        <div v-if="showValidationMessage" class="romantic-card p-6 mb-6 bg-gradient-to-r from-warm-coral/20 to-romantic-pink/20 border-2 border-warm-coral/50">
          <div class="text-center">
            <div class="text-4xl mb-3 animate-heart-beat">💕</div>
            <p class="text-lg font-romantic text-warm-coral animate-pulse-soft">
              {{ validationMessage }}
            </p>
          </div>
        </div>

        <!-- Create Button -->
        <div class="text-center">
          <button 
            type="submit"
            class="romantic-button text-2xl font-romantic animate-heart-beat"
          >
            Create My Cuddle Buddy Link ✨
          </button>
        </div>
      </form>

      <!-- Generated Link Display -->
      <div v-if="generatedLink" class="mt-8 bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-2xl p-6">
        <h3 class="text-2xl font-elegant text-warm-coral mb-4">🎉 Your Link is Ready!</h3>
        <div class="bg-white/70 rounded-xl p-4 mb-4">
          <p class="text-sm text-gray-600 mb-2">Share this link with your special someone:</p>
          <div class="bg-gray-100 rounded-lg p-3 font-mono text-sm break-all">
            {{ generatedLink }}
          </div>
        </div>
        <button 
          @click="copyLink"
          class="romantic-button text-lg font-romantic mb-4"
        >
          📋 Copy Link
        </button>
        <p class="text-sm text-gray-600">
          When they fill out the application, you'll receive their results at <strong>{{ creatorEmail }}</strong>! 💕
        </p>
      </div>

      <!-- Romantic Quote -->
      <div class="mt-12 p-6 bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-2xl">
        <p class="text-lg font-elegant italic text-gray-700">
          "The best way to find out if someone wants to cuddle is to ask them in the cutest way possible."
        </p>
        <p class="text-sm text-gray-500 mt-2">- Your Cuddle Buddy Matchmaker</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const creatorEmail = ref('')
const generatedLink = ref('')
const showValidationMessage = ref(false)
const validationMessage = ref('')

const createLink = () => {
  if (!creatorEmail.value) {
    validationMessage.value = "We need your email to send you their results, darling! 💕"
    showValidationMessage.value = true
    setTimeout(() => {
      showValidationMessage.value = false
    }, 4000)
    return
  }

  // Create the link with the creator's email as a parameter
  const baseUrl = window.location.origin
  const link = `${baseUrl}/apply?creator=${encodeURIComponent(creatorEmail.value)}`
  generatedLink.value = link
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(generatedLink.value)
    alert('Link copied to clipboard! 💕 Share it with your special someone!')
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = generatedLink.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Link copied to clipboard! 💕')
  }
}
</script>
