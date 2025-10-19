<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-romantic text-warm-coral mb-4 animate-pulse-soft">
          💕 Your Cuddle Application 💕
        </h1>
        <p class="text-lg text-gray-700 font-elegant">
          Tell us about yourself and your cuddle preferences!
        </p>
        
            <!-- Test Button - Hidden in production -->
            <div class="mt-6" v-if="isDevelopment">
              <button
                @click="fillTestData"
                class="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🧪 Fill Test Data (For Testing Email)
              </button>
              <p class="text-xs text-gray-500 mt-2">
                This will fill out all fields with sample data for testing
              </p>
            </div>
      </div>

      <form @submit.prevent="submitApplication" class="space-y-8">
        <!-- Photo Upload -->
        <div class="romantic-card p-8">
          <h2 class="text-2xl font-elegant text-warm-coral mb-6 text-center">
            📸 Upload Your Cute Photo <span class="text-red-500">*</span>
          </h2>
          <div class="flex flex-col items-center space-y-4">
            <div 
              @click="triggerFileUpload"
              class="w-48 h-48 border-4 border-dashed border-romantic-pink rounded-3xl flex items-center justify-center cursor-pointer hover:border-warm-coral transition-all duration-300 bg-gradient-to-br from-romantic-pink/10 to-soft-rose/10"
            >
              <div v-if="!photoPreview" class="text-center">
                <div class="text-6xl mb-2">📷</div>
                <p class="text-sm text-gray-600">Tap to upload</p>
              </div>
              <img v-else :src="photoPreview" alt="Your photo" class="w-full h-full object-cover rounded-2xl" />
            </div>
            <input 
              ref="fileInput"
              type="file" 
              accept="image/*" 
              @change="handlePhotoUpload"
              class="hidden"
            />
            <p class="text-sm text-gray-500 text-center">
              Upload a cute photo of yourself! The cuter, the better! 💖<br>
              <span class="text-red-500 font-semibold">Photo is required to complete your application.</span>
            </p>
          </div>
        </div>

        <!-- Personal Info -->
        <div class="romantic-card p-8">
          <h2 class="text-2xl font-elegant text-warm-coral mb-6 text-center">
            👤 About You
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input 
                v-model="form.name"
                type="text" 
                class="romantic-input"
                placeholder="What should we call you?"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
              <input 
                v-model="form.age"
                type="number" 
                class="romantic-input"
                placeholder="How old are you?"
                min="18"
                max="100"
              />
            </div>
          </div>
        </div>

        <!-- Cuddle Preferences -->
        <div class="romantic-card p-8">
          <h2 class="text-2xl font-elegant text-warm-coral mb-6 text-center">
            🐻 Cuddle Preferences
          </h2>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">What's your favorite cuddle position?</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label v-for="position in cuddlePositions" :key="position" class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    v-model="form.favoritePosition"
                    type="radio" 
                    :value="position"
                    class="text-warm-coral focus:ring-warm-coral"
                  />
                  <span class="text-sm">{{ position }}</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">How often do you like to cuddle?</label>
              <select v-model="form.cuddleFrequency" class="romantic-input">
                <option value="">Choose your frequency</option>
                <option value="daily">Every day! 💕</option>
                <option value="weekly">A few times a week</option>
                <option value="weekend">Weekends are perfect</option>
                <option value="special">Only on special occasions</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">What's your ideal cuddle temperature?</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label v-for="temp in temperatures" :key="temp" class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    v-model="form.idealTemperature"
                    type="radio" 
                    :value="temp"
                    class="text-warm-coral focus:ring-warm-coral"
                  />
                  <span class="text-sm">{{ temp }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Romantic Questions -->
        <div class="romantic-card p-8">
          <h2 class="text-2xl font-elegant text-warm-coral mb-6 text-center">
            💖 Romantic Questions
          </h2>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What's your love language?</label>
              <select v-model="form.loveLanguage" class="romantic-input">
                <option value="">Choose your love language</option>
                <option value="physical">Physical Touch 💕</option>
                <option value="words">Words of Affirmation 💬</option>
                <option value="gifts">Receiving Gifts 🎁</option>
                <option value="time">Quality Time ⏰</option>
                <option value="acts">Acts of Service 🤗</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Describe your perfect cuddle session in one sentence:</label>
              <textarea 
                v-model="form.perfectCuddle"
                class="romantic-input h-24 resize-none"
                placeholder="Tell us about your dream cuddle scenario... What makes it perfect? 💭"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What makes you feel most loved and secure?</label>
              <textarea 
                v-model="form.whatMakesYouFeelLoved"
                class="romantic-input h-24 resize-none"
                placeholder="Share what makes your heart flutter... What makes you feel special? 💖"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What's your ideal date night?</label>
              <select v-model="form.idealDate" class="romantic-input">
                <option value="">Choose your perfect date</option>
                <option value="cozy">Cozy night in with movies and cuddles 🍿</option>
                <option value="outdoor">Romantic walk under the stars 🌟</option>
                <option value="dinner">Intimate dinner for two 🍽️</option>
                <option value="adventure">Fun adventure together 🎢</option>
                <option value="spa">Relaxing spa day together 🧖‍♀️</option>
                <option value="surprise">I love surprises! 🎁</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What's your favorite way to show affection?</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label v-for="affection in affectionWays" :key="affection" class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    v-model="form.favoriteAffection"
                    type="radio" 
                    :value="affection"
                    class="text-warm-coral focus:ring-warm-coral"
                  />
                  <span class="text-sm">{{ affection }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="romantic-card p-8">
          <h2 class="text-2xl font-elegant text-warm-coral mb-6 text-center">
            📧 Contact Information
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Email Address</label>
              <input 
                v-model="form.email"
                type="email" 
                class="romantic-input"
                placeholder="your.email@example.com"
              />
            </div>
            <div v-if="creatorEmail">
              <div class="bg-gradient-to-r from-romantic-pink/20 to-gentle-purple/20 rounded-xl p-4 mb-4">
                <div class="text-center">
                  <div class="text-2xl mb-2">💕</div>
                  <p class="text-sm text-gray-700">
                    Your results will be sent to the person who sent you this link!
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    They're waiting to see your cuddle buddy application! 💖
                  </p>
                </div>
              </div>
            </div>
            <div v-else>
              <label class="block text-sm font-medium text-gray-700 mb-2">Where should we send your results?</label>
              <input 
                v-model="form.recipientEmail"
                type="email" 
                class="romantic-input"
                placeholder="recipient@example.com"
              />
            </div>
          </div>
        </div>

        <!-- Cute Validation Modal -->
        <div v-if="showValidationMessage" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div class="romantic-card p-8 max-w-md w-full bg-gradient-to-br from-romantic-pink/90 to-soft-rose/90 backdrop-blur-sm border-2 border-warm-coral/50 shadow-2xl">
            <div class="text-center">
              <div class="text-6xl mb-4 animate-heart-beat">💕</div>
              <h3 class="text-2xl font-romantic text-warm-coral mb-4 animate-pulse-soft">
                Oops! 💖
              </h3>
              <p class="text-lg font-elegant text-gray-800 mb-6 animate-pulse-soft">
                {{ currentValidationMessage }}
              </p>
              <button 
                @click="showValidationMessage = false"
                class="romantic-button text-lg font-romantic"
              >
                Got it! 💕
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button 
            type="submit"
            class="romantic-button text-2xl font-romantic animate-heart-beat"
          >
            Submit My Application 💕
          </button>
          <p class="text-sm text-gray-500 mt-4">
            Your results will be sent to the email address you provided!
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
const photoPreview = ref(null)

const form = ref({
  name: '',
  age: '',
  email: '',
  recipientEmail: '',
  favoritePosition: '',
  cuddleFrequency: '',
  idealTemperature: '',
  loveLanguage: '',
  perfectCuddle: '',
  whatMakesYouFeelLoved: '',
  idealDate: '',
  favoriteAffection: '',
  photo: null
})

const creatorEmail = ref('')

const validationMessages = {
  name: [
    "Oops! We need to know what to call you, cutie! 💕",
    "Hey there! What's your adorable name? 🥰",
    "We can't cuddle without knowing your name! 💖",
    "Pretty please tell us your name? ✨"
  ],
  age: [
    "How old are you, sweetie? We need to know! 🎂",
    "Age is just a number, but we still need it! 💕",
    "Tell us your age so we can match you perfectly! 🌟",
    "Your age helps us find your perfect cuddle buddy! 💖"
  ],
  email: [
    "We need your email to send you results, darling! 📧",
    "Your email is like a love letter address! 💌",
    "How else will we send you your cuddle results? 💕",
    "Email us your contact info, pretty please! ✨"
  ],
  recipientEmail: [
    "Who should we send your results to? 💕",
    "We need an email to share your adorable results! 📧",
    "Tell us where to send your cuddle report! 💖",
    "Who's the lucky person getting your results? ✨"
  ],
  favoritePosition: [
    "What's your favorite cuddle position, cutie? 🥄",
    "We need to know how you like to cuddle! 💕",
    "Pick your perfect cuddle pose! 🐻",
    "Your cuddle style is important to us! 💖"
  ],
  cuddleFrequency: [
    "How often do you like to cuddle, sweetie? 💕",
    "Tell us your cuddle schedule! 📅",
    "We need to know your cuddle frequency! 💖",
    "How often do you want those warm hugs? 🤗"
  ],
  idealTemperature: [
    "What temperature makes you feel cozy? 🌡️",
    "Tell us your perfect cuddle climate! 💕",
    "We need to know your temperature preference! 🌟",
    "What makes you feel most comfortable? 💖"
  ],
  loveLanguage: [
    "What's your love language, darling? 💕",
    "How do you like to receive love? 💖",
    "Tell us how you feel most loved! ✨",
    "We need to know your love style! 💕"
  ],
  perfectCuddle: [
    "Describe your dream cuddle session! 💭",
    "Tell us about your perfect cuddle! 💕",
    "We want to hear about your ideal cuddle! 💖",
    "Paint us a picture of your perfect cuddle! 🎨"
  ],
  whatMakesYouFeelLoved: [
    "What makes your heart flutter? 💕",
    "Tell us what makes you feel most loved! 💖",
    "What makes you feel secure and loved? ✨",
    "We want to know what makes you feel special! 💕"
  ],
  idealDate: [
    "What's your perfect date night, cutie? 🌟",
    "Tell us about your dream date! 💕",
    "What kind of date makes your heart skip? 💖",
    "We need to know your ideal romantic evening! ✨"
  ],
  favoriteAffection: [
    "How do you like to show love, sweetie? 💕",
    "What's your favorite way to be affectionate? 💖",
    "Tell us how you express your feelings! 💗",
    "We want to know your love style! ✨"
  ],
  photo: [
    "We need to see your cute face, darling! 📸",
    "Upload a photo so we can see how adorable you are! 💕",
    "Your photo is required for the application! 📷",
    "We can't match you without seeing your beautiful face! ✨"
  ]
}

const showValidationMessage = ref(false)
const currentValidationMessage = ref('')
const validationField = ref('')

// Get creator email from URL params (encrypted)
onMounted(() => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const creator = urlParams.get('creator')
    const encrypted = urlParams.get('c')
    
    console.log('URL params:', { creator, encrypted })
    
    if (creator) {
      // Old format (unencrypted)
      creatorEmail.value = decodeURIComponent(creator)
      form.value.recipientEmail = creatorEmail.value
      console.log('Set creator email (old format):', creatorEmail.value)
    } else if (encrypted) {
      // New format (encrypted)
      try {
        creatorEmail.value = atob(encrypted)
        form.value.recipientEmail = creatorEmail.value
        console.log('Set creator email (encrypted):', creatorEmail.value)
      } catch (error) {
        console.error('Error decoding email:', error)
      }
    }
  } catch (error) {
    console.error('Error in onMounted:', error)
  }
})

const cuddlePositions = [
  'Spooning 🥄',
  'Big Spoon 🥄',
  'Face to Face 👀',
  'Back to Chest 🫂',
  'Leg Hug 🦵',
  'Head on Shoulder 🤗',
  'Lap Cuddle 🪑',
  'Side by Side 👫'
]

const temperatures = [
  'Warm & Cozy 🔥',
  'Cool & Fresh ❄️',
  'Room Temperature 🌡️',
  'Body Temperature 🤗'
]

const affectionWays = [
  'Hugs & Cuddles 🤗',
  'Sweet Words 💬',
  'Little Gifts 🎁',
  'Quality Time ⏰',
  'Acts of Service 🤝',
  'Physical Touch 💕'
]

const isFormValid = computed(() => {
  return form.value.name && 
         form.value.age && 
         form.value.email && 
         form.value.recipientEmail &&
         form.value.favoritePosition &&
         form.value.cuddleFrequency &&
         form.value.idealTemperature &&
         form.value.loveLanguage &&
         form.value.perfectCuddle &&
         form.value.whatMakesYouFeelLoved &&
         form.value.idealDate &&
         form.value.favoriteAffection &&
         form.value.photo
})

const isDevelopment = computed(() => {
  return import.meta.env.DEV || window.location.hostname === 'localhost'
})

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataURL = e.target.result
      form.value.photo = dataURL
      photoPreview.value = dataURL
    }
    reader.readAsDataURL(file)
  }
}

const showCuteValidation = (fieldName) => {
  const messages = validationMessages[fieldName]
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  
  currentValidationMessage.value = randomMessage
  validationField.value = fieldName
  showValidationMessage.value = true
}

const fillTestData = () => {
  form.value = {
    name: 'Alex Johnson',
    age: '28',
    email: 'alex.johnson@example.com',
    recipientEmail: 'brandon.shilling@proton.me',
    favoritePosition: 'Spooning',
    cuddleFrequency: 'daily',
    idealTemperature: 'Warm and cozy',
    loveLanguage: 'physical',
    perfectCuddle: 'Curled up on the couch with soft blankets, watching a movie together while holding hands and sharing gentle kisses.',
    whatMakesYouFeelLoved: 'When someone remembers the little things about me, like my favorite coffee order or how I like my pillows arranged. Small gestures mean everything.',
    idealDate: 'cozy',
    favoriteAffection: 'Holding hands',
    photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZCNkMxIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiNGRkYzRjMiLz4KPHBhdGggZD0iTTEwMCAyMDBMMTUwIDE1MEwyMDAgMjAwIiBzdHJva2U9IiNGRkYzRjMiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIxNTAiIHk9IjI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5GAPC90ZXh0Pgo8L3N2Zz4K'
  }
  
  // Set the photo preview
  photoPreview.value = form.value.photo
  
  // Show a cute success message
  currentValidationMessage.value = 'Test data filled! Ready to test the email service! 🎉'
  showValidationMessage.value = true
}

const submitApplication = () => {
  // Check each required field and show cute validation
  if (!form.value.name) {
    showCuteValidation('name')
    return
  }
  if (!form.value.age) {
    showCuteValidation('age')
    return
  }
  if (!form.value.email) {
    showCuteValidation('email')
    return
  }
  if (!form.value.recipientEmail) {
    showCuteValidation('recipientEmail')
    return
  }
  if (!form.value.favoritePosition) {
    showCuteValidation('favoritePosition')
    return
  }
  if (!form.value.cuddleFrequency) {
    showCuteValidation('cuddleFrequency')
    return
  }
  if (!form.value.idealTemperature) {
    showCuteValidation('idealTemperature')
    return
  }
  if (!form.value.loveLanguage) {
    showCuteValidation('loveLanguage')
    return
  }
  if (!form.value.perfectCuddle) {
    showCuteValidation('perfectCuddle')
    return
  }
  if (!form.value.whatMakesYouFeelLoved) {
    showCuteValidation('whatMakesYouFeelLoved')
    return
  }
  if (!form.value.idealDate) {
    showCuteValidation('idealDate')
    return
  }
  if (!form.value.favoriteAffection) {
    showCuteValidation('favoriteAffection')
    return
  }
  if (!form.value.photo) {
    showCuteValidation('photo')
    return
  }
  
  // Store form data in localStorage
  localStorage.setItem('cuddleApplication', JSON.stringify(form.value))
  
  // Navigate to results
  router.push('/results')
}
</script>
