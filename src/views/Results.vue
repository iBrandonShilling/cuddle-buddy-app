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

        <!-- Compatibility Score -->
        <div class="bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-2xl p-6 mb-8">
          <h3 class="text-2xl font-elegant text-center mb-4">Your Cuddle Compatibility Score</h3>
          <div class="text-center">
            <div class="text-6xl font-romantic text-warm-coral mb-2">{{ compatibilityScore }}%</div>
            <p class="text-lg text-gray-700">{{ compatibilityMessage }}</p>
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
          class="romantic-button text-xl font-romantic animate-heart-beat"
        >
          Send Results via Email 📧
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
const compatibilityScore = ref(0)
const compatibilityMessage = ref('')

onMounted(() => {
  // Get form data from localStorage
  const storedData = localStorage.getItem('cuddleApplication')
  if (storedData) {
    applicationData.value = JSON.parse(storedData)
    calculateCompatibility()
  } else {
    // If no data found, redirect to home
    router.push('/')
  }
})

const calculateCompatibility = () => {
  let score = 0
  const data = applicationData.value
  
  // Base score for completing the application
  score += 20
  
  // Age compatibility (18-30 gets bonus points)
  const age = parseInt(data.age)
  if (age >= 18 && age <= 30) score += 15
  else if (age >= 31 && age <= 45) score += 10
  else score += 5
  
  // Cuddle frequency bonus
  if (data.cuddleFrequency === 'daily') score += 20
  else if (data.cuddleFrequency === 'weekly') score += 15
  else if (data.cuddleFrequency === 'weekend') score += 10
  else score += 5
  
  // Love language bonus
  if (data.loveLanguage === 'physical') score += 15
  else if (data.loveLanguage === 'words') score += 12
  else if (data.loveLanguage === 'time') score += 10
  else score += 8
  
  // Temperature preference bonus
  if (data.idealTemperature?.includes('Warm')) score += 10
  else if (data.idealTemperature?.includes('Body')) score += 8
  else score += 5
  
  // Cuddle position bonus
  if (data.favoritePosition?.includes('Spooning')) score += 10
  else if (data.favoritePosition?.includes('Face to Face')) score += 8
  else score += 5
  
  // Text length bonus (more detailed answers)
  if (data.perfectCuddle && data.perfectCuddle.length > 50) score += 10
  if (data.whatMakesYouFeelLoved && data.whatMakesYouFeelLoved.length > 50) score += 10
  
  // Random romantic bonus (85-98%)
  const randomBonus = Math.floor(Math.random() * 14) + 85
  score = Math.min(score, randomBonus)
  
  compatibilityScore.value = score
  
  // Set message based on score
  if (score >= 95) {
    compatibilityMessage.value = "Perfect Match! 💕"
  } else if (score >= 90) {
    compatibilityMessage.value = "Amazing Compatibility! 💖"
  } else if (score >= 85) {
    compatibilityMessage.value = "Great Match! 💗"
  } else if (score >= 80) {
    compatibilityMessage.value = "Good Compatibility! 💝"
  } else {
    compatibilityMessage.value = "Nice Match! 💘"
  }
}

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

const sendResults = () => {
  // Create email content
  const emailContent = `
Subject: Your Cuddle Buddy Application Results! 💕

Dear ${applicationData.value.name},

Congratulations! Your cuddle buddy application has been processed and you scored an amazing ${compatibilityScore.value}% compatibility! 

Here are your results:

🌟 Your Cuddle Profile:
- Name: ${applicationData.value.name} (${applicationData.value.age} years young!)
- Favorite Position: ${applicationData.value.favoritePosition}
- Cuddle Frequency: ${getFrequencyText(applicationData.value.cuddleFrequency)}
- Ideal Temperature: ${applicationData.value.idealTemperature}
- Love Language: ${getLoveLanguageText(applicationData.value.loveLanguage)}

💭 Your Perfect Cuddle:
"${applicationData.value.perfectCuddle}"

💖 What Makes You Feel Loved:
"${applicationData.value.whatMakesYouFeelLoved}"

🔮 Compatibility Analysis:
✨ Amazing cuddle communication
🤗 Perfect temperature compatibility  
💖 Strong emotional connection potential
🌟 Natural cuddle chemistry

🎯 Recommendations:
💕 Start with gentle cuddles
🌙 Perfect for evening sessions
🎵 Soft music enhances the mood
🕯️ Dim lighting creates magic

You're a perfect cuddle buddy candidate! Someone special is going to be very lucky to have you! 💕

With love and cuddles,
Your Cuddle Buddy Matchmaker 💖
  `

  // Create mailto link that opens the user's default email client
  const mailtoLink = `mailto:${applicationData.value.recipientEmail}?subject=${encodeURIComponent('Your Cuddle Buddy Application Results! 💕')}&body=${encodeURIComponent(emailContent)}`
  
  // Try to open in default email client
  try {
    window.location.href = mailtoLink
  } catch (error) {
    // Fallback: copy to clipboard and show instructions
    navigator.clipboard.writeText(emailContent).then(() => {
      alert('Email content copied to clipboard! You can now paste it into your email client and send it to ' + applicationData.value.recipientEmail)
    }).catch(() => {
      // Final fallback: show the content in a modal
      showEmailModal()
    })
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
