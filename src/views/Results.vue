<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-romantic text-warm-coral mb-4 animate-pulse-soft">
          💕 Your Cuddle Buddy Results 💕
        </h1>
        <p class="text-lg text-gray-700 font-elegant">
          Here's your personalized cuddle compatibility report!
        </p>
      </div>

      <!-- Results Card -->
      <div class="romantic-card p-8 mb-8">
        <div class="text-center mb-8">
          <div class="text-8xl animate-float mb-4">🐻💕🐰</div>
          <h2 class="text-3xl font-elegant text-warm-coral mb-4">
            Congratulations, {{ applicationData.name }}!
          </h2>
          <div class="text-6xl mb-4 animate-heart-beat">💖</div>
        </div>

        <!-- Application Complete -->
        <div class="bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-2xl p-6 mb-8">
          <div class="text-center">
            <div class="text-6xl font-romantic text-warm-coral mb-4 animate-heart-beat">💕</div>
            <h3 class="text-2xl font-elegant text-warm-coral mb-2">Application Complete!</h3>
            <p class="text-lg text-gray-700">Your cuddle buddy application has been submitted successfully!</p>
          </div>
        </div>

        <!-- Personal Analysis -->
        <div class="space-y-6">
          <div class="bg-white/50 rounded-2xl p-6">
            <h3 class="text-xl font-elegant text-warm-coral mb-3">🌟 Your Cuddle Profile</h3>
            <p class="text-gray-700">
              <strong>Name:</strong> {{ applicationData.name }} ({{ applicationData.age }} years young!)<br>
              <strong>Favorite Position:</strong> {{ applicationData.favoritePosition }}<br>
              <strong>Cuddle Frequency:</strong> {{ getFrequencyText(applicationData.cuddleFrequency) }}<br>
              <strong>Ideal Temperature:</strong> {{ applicationData.idealTemperature }}<br>
              <strong>Love Language:</strong> {{ getLoveLanguageText(applicationData.loveLanguage) }}
            </p>
          </div>

          <div class="bg-white/50 rounded-2xl p-6">
            <h3 class="text-xl font-elegant text-warm-coral mb-3">💭 Your Perfect Cuddle</h3>
            <p class="text-gray-700 italic">"{{ applicationData.perfectCuddle }}"</p>
          </div>

          <div class="bg-white/50 rounded-2xl p-6">
            <h3 class="text-xl font-elegant text-warm-coral mb-3">💖 What Makes You Feel Loved</h3>
            <p class="text-gray-700 italic">"{{ applicationData.whatMakesYouFeelLoved }}"</p>
          </div>
        </div>
      </div>

      <!-- Compatibility Analysis -->
      <div class="romantic-card p-8 mb-8">
        <h2 class="text-2xl font-elegant text-warm-coral mb-6 text-center">
          🔮 Compatibility Analysis
        </h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-romantic-pink/20 to-soft-rose/20 rounded-2xl p-6">
            <h3 class="text-lg font-elegant text-warm-coral mb-3">💕 Strengths</h3>
            <ul class="space-y-2 text-gray-700">
              <li>✨ Amazing cuddle communication</li>
              <li>🤗 Perfect temperature compatibility</li>
              <li>💖 Strong emotional connection potential</li>
              <li>🌟 Natural cuddle chemistry</li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-gentle-purple/20 to-dreamy-blue/20 rounded-2xl p-6">
            <h3 class="text-lg font-elegant text-warm-coral mb-3">🎯 Recommendations</h3>
            <ul class="space-y-2 text-gray-700">
              <li>💕 Start with gentle cuddles</li>
              <li>🌙 Perfect for evening sessions</li>
              <li>🎵 Soft music enhances the mood</li>
              <li>🕯️ Dim lighting creates magic</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="text-center space-y-4">
        <button 
          @click="sendResults"
          :disabled="loading"
          class="romantic-button text-xl font-romantic animate-heart-beat disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Sending... 💕</span>
          <span v-else-if="emailSent">Email Sent! ✅</span>
          <span v-else>Send Results via Email 📧</span>
        </button>
        
        <button 
          @click="startNewApplication"
          class="bg-white/70 text-warm-coral border-2 border-warm-coral font-semibold py-3 px-8 rounded-full hover:bg-warm-coral hover:text-white transition-all duration-300"
        >
          Create Another Application 💕
        </button>
      </div>

      <!-- Romantic Quote -->
      <div class="mt-12 p-6 bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-2xl text-center">
        <p class="text-lg font-elegant italic text-gray-700">
          "The best cuddles happen when two hearts beat as one."
        </p>
        <p class="text-sm text-gray-500 mt-2">- Your Cuddle Buddy Matchmaker</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const applicationData = ref({})
const loading = ref(false)
const emailSent = ref(false)

onMounted(() => {
  // Get form data from localStorage
  const storedData = localStorage.getItem('cuddleApplication')
  if (storedData) {
    applicationData.value = JSON.parse(storedData)
  } else {
    // If no data found, redirect to home
    router.push('/')
  }
})

const getFrequencyText = (frequency) => {
  const frequencyMap = {
    'daily': 'Every day! 💕',
    'weekly': 'A few times a week',
    'weekend': 'Weekends are perfect',
    'special': 'Only on special occasions'
  }
  return frequencyMap[frequency] || frequency
}

const getLoveLanguageText = (language) => {
  const languageMap = {
    'physical': 'Physical Touch 💕',
    'words': 'Words of Affirmation 💬',
    'gifts': 'Receiving Gifts 🎁',
    'time': 'Quality Time ⏰',
    'acts': 'Acts of Service 🤗'
  }
  return languageMap[language] || language
}

const sendResults = async () => {
  const loading = ref(false)
  const emailSent = ref(false)
  
  try {
    loading.value = true
    
    // Send email via our Vercel API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientEmail: applicationData.value.recipientEmail,
        name: applicationData.value.name,
        compatibilityScore: compatibilityScore.value,
        applicationData: applicationData.value
      })
    })
    
    const result = await response.json()
    
    if (response.ok) {
      emailSent.value = true
      // Show success message
      alert('Email sent successfully! 💕 Check the recipient\'s inbox!')
    } else {
      throw new Error(result.error || 'Failed to send email')
    }
    
  } catch (error) {
    console.error('Error sending email:', error)
    
    // Fallback to manual email method
    const emailContent = `
Subject: Your Cuddle Buddy Application Results! 💕

Dear Friend,

Someone special has filled out a cuddle buddy application! Here are their details:

🌟 Their Cuddle Profile:
- Name: ${applicationData.value.name} (${applicationData.value.age} years young!)
- Favorite Position: ${applicationData.value.favoritePosition}
- Cuddle Frequency: ${getFrequencyText(applicationData.value.cuddleFrequency)}
- Ideal Temperature: ${applicationData.value.idealTemperature}
- Love Language: ${getLoveLanguageText(applicationData.value.loveLanguage)}

💭 Their Perfect Cuddle:
"${applicationData.value.perfectCuddle}"

💖 What Makes Them Feel Loved:
"${applicationData.value.whatMakesYouFeelLoved}"

🎯 Their Contact Info:
- Email: ${applicationData.value.email}

This person is looking for a cuddle buddy! They've shared their preferences and what makes them feel loved. Perfect for getting to know them better! 💕

With love and cuddles,
Your Cuddle Buddy Matchmaker 💖
    `
    
    // Try to copy to clipboard
    try {
      await navigator.clipboard.writeText(emailContent)
      alert('Email service unavailable. Content copied to clipboard! Paste it into your email and send to ' + applicationData.value.recipientEmail)
    } catch {
      // Show modal with email content
      showEmailModal(emailContent)
    }
  } finally {
    loading.value = false
  }
}

const showEmailModal = () => {
  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(0,0,0,0.8); z-index: 9999; display: flex; 
    align-items: center; justify-content: center; padding: 20px;
  `
  modal.innerHTML = `
    <div style="background: white; border-radius: 20px; padding: 30px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
      <h3 style="color: #FF7F7F; font-size: 24px; margin-bottom: 20px;">📧 Email Content</h3>
      <p style="margin-bottom: 15px;">Copy this content and send it to: <strong>${applicationData.value.recipientEmail}</strong></p>
      <textarea readonly style="width: 100%; height: 300px; padding: 15px; border: 2px solid #FFB6C1; border-radius: 10px; font-family: monospace; font-size: 12px;">${emailContent}</textarea>
      <div style="margin-top: 20px; text-align: center;">
        <button onclick="this.closest('div').parentElement.remove()" style="background: #FF7F7F; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer;">Close</button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
}

const startNewApplication = () => {
  router.push('/apply')
}
</script>
