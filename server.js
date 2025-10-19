// Development server for API routes
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createTransport } from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

const app = express()
const PORT = 3002

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Middleware
app.use(cors())
app.use(express.json())

// Serve uploaded images
app.use('/uploads', express.static(uploadsDir))

// Email service endpoint
app.post('/api/send-email', async (req, res) => {
    console.log('📧 Email API called with:', JSON.stringify(req.body, null, 2))
    
    // Also write to file for debugging
    const fs = await import('fs')
    fs.writeFileSync('server-logs.txt', `📧 Email API called with: ${JSON.stringify(req.body, null, 2)}\n`, { flag: 'a' })
  
  const { recipientEmail, name, applicationData } = req.body

  // Validate required fields
  if (!recipientEmail || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    console.log('🔧 Gmail credentials check:')
    console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✅ Set' : '❌ Not set')
    console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✅ Set' : '❌ Not set')

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Gmail credentials not configured')
    }

    // Create Gmail transporter
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    // Test connection
    await transporter.verify()
    console.log('✅ Gmail connection verified')

    // Create beautiful HTML email
    console.log('📸 Photo data:', applicationData.photo ? 'Present' : 'Missing')
    console.log('📸 Photo type:', typeof applicationData.photo)
    console.log('📸 Photo length:', applicationData.photo ? applicationData.photo.length : 0)
    console.log('📸 Photo starts with:', applicationData.photo ? applicationData.photo.substring(0, 50) + '...' : 'N/A')
    
    // Handle photo - save to server and get URL
    let photoUrl = null
    let photoUploadFailed = false
    
    if (applicationData.photo) {
      try {
        console.log('📸 Saving photo to server...')
        console.log('📸 Photo data length:', applicationData.photo.length)
        console.log('📸 Photo data type:', applicationData.photo.substring(0, 50))
        
        // Extract base64 data from data URL
        const base64Data = applicationData.photo.split(',')[1]
        console.log('📸 Base64 data length:', base64Data ? base64Data.length : 'No base64 data')
        
        // Generate unique filename
        const timestamp = Date.now()
        const filename = `photo_${timestamp}.jpg`
        const filepath = path.join(uploadsDir, filename)
        
        // Save image to server
        const buffer = Buffer.from(base64Data, 'base64')
        fs.writeFileSync(filepath, buffer)
        
        // Create public URL
        photoUrl = `http://localhost:${PORT}/uploads/${filename}`
        console.log('✅ Photo saved to server:', photoUrl)
        
        // Schedule deletion after 24 hours
        setTimeout(() => {
          try {
            if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath)
              console.log('🗑️ Deleted old photo:', filename)
            }
          } catch (error) {
            console.error('❌ Error deleting old photo:', error.message)
          }
        }, 24 * 60 * 60 * 1000) // 24 hours
        
      } catch (error) {
        console.error('❌ Error saving photo:', error.message)
        photoUrl = null
        photoUploadFailed = true
      }
    }
    
    const photoSection = photoUrl ? `
      <div style="text-align: center; margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); border-radius: 20px; border: 3px solid #FF7F7F; box-shadow: 0 10px 30px rgba(255, 127, 127, 0.3);">
        <h2 style="color: #FF7F7F; font-size: 28px; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">📸 PHOTO 📸</h2>
        <p style="color: #333; font-size: 18px; margin: 15px 0; font-weight: bold;">A photo was uploaded with this application!</p>
        <div style="background: #fff; padding: 25px; border-radius: 15px; margin: 20px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
          <img src="${photoUrl}" alt="Their photo" style="max-width: 350px; max-height: 350px; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.3); border: 4px solid #FF7F7F;" />
        </div>
        <div style="background: #fff; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #FF7F7F;">
          <h3 style="color: #FF7F7F; font-size: 20px; margin-bottom: 10px;">🔗 PHOTO LINK:</h3>
          <p style="color: #333; font-size: 16px; word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <a href="${photoUrl}" style="color: #FF7F7F; text-decoration: underline; font-weight: bold;">${photoUrl}</a>
          </p>
        </div>
      </div>
    ` : applicationData.photo ? `
      <div style="text-align: center; margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); border-radius: 20px; border: 3px solid #FF7F7F; box-shadow: 0 10px 30px rgba(255, 127, 127, 0.3);">
        <h2 style="color: #FF7F7F; font-size: 28px; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">📸 PHOTO 📸</h2>
        <p style="color: #333; font-size: 18px; margin: 15px 0; font-weight: bold;">A photo was uploaded with this application!</p>
        <div style="background: #fff; padding: 25px; border-radius: 15px; margin: 20px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
          <p style="color: #FF7F7F; font-size: 24px; margin: 20px 0;">📷 PHOTO UPLOADED BUT HOSTING FAILED 📷</p>
          <p style="color: #666; font-size: 16px;">The photo was uploaded but we couldn't get a public URL for it. The photo data is available in the application results.</p>
        </div>
      </div>
    ` : `
      <div style="text-align: center; margin: 30px 0; padding: 30px; background: #f8f9fa; border-radius: 20px; border: 3px solid #ddd;">
        <h2 style="color: #FF7F7F; font-size: 28px; margin-bottom: 20px;">📸 PHOTO 📸</h2>
        <p style="color: #666; font-size: 18px;">No photo was uploaded with this application.</p>
      </div>
    `
    
    console.log('📸 Photo section HTML:', photoSection ? 'Generated' : 'Empty')
    console.log('📸 Photo section length:', photoSection.length)
    console.log('📸 Photo section preview:', photoSection.substring(0, 200) + '...')

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #FFB6C1, #FFC0CB, #DDA0DD); }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; color: #FF7F7F; font-size: 2.5rem; margin-bottom: 20px; }
        .card { background: white; padding: 30px; border-radius: 20px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .profile { background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .quote { background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; font-style: italic; }
        .footer { text-align: center; color: #666; font-size: 0.9rem; margin-top: 30px; }
        .heart { color: #FF7F7F; font-size: 1.5rem; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">💕 Cuddle Buddy Application 💕</div>

        <div class="card">
          <h2 style="color: #FF7F7F;">Dear Friend,</h2>
          <p style="font-size: 1.2rem; color: #666;">Someone special has filled out a cuddle buddy application! Here are their details:</p>

          ${photoSection}
          
          <div class="profile">
            <h3 style="color: #FF7F7F;">🌟 Their Cuddle Profile:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Name:</strong> ${name} (${applicationData.age} years young!)</li>
              <li style="margin: 10px 0;"><strong>Favorite Position:</strong> ${applicationData.favoritePosition}</li>
              <li style="margin: 10px 0;"><strong>Cuddle Frequency:</strong> ${applicationData.cuddleFrequency}</li>
              <li style="margin: 10px 0;"><strong>Ideal Temperature:</strong> ${applicationData.idealTemperature}</li>
              <li style="margin: 10px 0;"><strong>Love Language:</strong> ${applicationData.loveLanguage}</li>
              <li style="margin: 10px 0;"><strong>Ideal Date:</strong> ${applicationData.idealDate || 'Not specified'}</li>
              <li style="margin: 10px 0;"><strong>Favorite Affection:</strong> ${applicationData.favoriteAffection || 'Not specified'}</li>
            </ul>
          </div>
          
          <div class="quote">
            <h3 style="color: #FF7F7F;">💭 Their Perfect Cuddle:</h3>
            <p>"${applicationData.perfectCuddle}"</p>
          </div>
          
          <div class="quote">
            <h3 style="color: #FF7F7F;">💖 What Makes Them Feel Loved:</h3>
            <p>"${applicationData.whatMakesYouFeelLoved}"</p>
          </div>
          
          <div style="background: #d1ecf1; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #FF7F7F;">🎯 Their Contact Info:</h3>
            <p><strong>Email:</strong> ${applicationData.email}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <h2 style="color: #FF7F7F; font-size: 2rem;">This person is looking for a cuddle buddy! <span class="heart">💕</span></h2>
            <p style="font-size: 1.1rem; color: #666;">They've shared their preferences and what makes them feel loved. Perfect for getting to know them better!</p>
          </div>
        </div>
        
        <div class="footer">
          <p>With love and cuddles,<br>Your Cuddle Buddy Matchmaker <span class="heart">💖</span></p>
        </div>
      </div>
    </body>
    </html>
    `

        // Create text version with photo URL
        const textContent = `
Your Cuddle Buddy Application Results! 💕

Dear Friend,

Someone special has filled out a cuddle buddy application! Here are their details:

${photoUrl ? `📸 PHOTO: ${photoUrl}` : '📸 No photo uploaded'}

🌟 Their Cuddle Profile:
- Name: ${name} (${applicationData.age} years young!)
- Favorite Position: ${applicationData.favoritePosition}
- Cuddle Frequency: ${applicationData.cuddleFrequency}
- Ideal Temperature: ${applicationData.idealTemperature}
- Love Language: ${applicationData.loveLanguage}
- Ideal Date: ${applicationData.idealDate || 'Not specified'}
- Favorite Affection: ${applicationData.favoriteAffection || 'Not specified'}

💭 Their Perfect Cuddle:
"${applicationData.perfectCuddle}"

💖 What Makes Them Feel Loved:
"${applicationData.whatMakesYouFeelLoved}"

🎯 Their Contact Info:
- Email: ${applicationData.email}

This person is looking for a cuddle buddy! They've shared their preferences and what makes them feel loved. Perfect for getting to know them better! 💕

With love and cuddles,
Your Cuddle Buddy Matchmaker 💖
        `

        // Send email using Gmail
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: recipientEmail,
          subject: 'Your Cuddle Buddy Application Results! 💕',
          html: htmlContent,
          text: textContent
        }
    
    console.log('📧 Email HTML length:', htmlContent.length)
    console.log('📧 Email contains photo section:', htmlContent.includes('📸 Their Photo:'))
    console.log('📧 Email contains img tag:', htmlContent.includes('<img'))
    console.log('📧 Photo URL being used:', photoUrl ? photoUrl.substring(0, 100) + '...' : 'None')
    console.log('📧 Email contains photo section:', htmlContent.includes('📸 THEIR PHOTO'))
    console.log('📧 Email contains Photo URL text:', htmlContent.includes('Photo URL:'))
    console.log('📧 Email contains PHOTO SECTION:', htmlContent.includes('📸 PHOTO SECTION 📸'))
    console.log('📧 Email contains PHOTO TEST:', htmlContent.includes('📷 PHOTO TEST SECTION 📷'))
    
    // Log a sample of the HTML to see what's actually being generated
    console.log('📧 HTML Sample (first 1000 chars):', htmlContent.substring(0, 1000))
    console.log('📧 HTML Sample (last 1000 chars):', htmlContent.substring(htmlContent.length - 1000))

    // Send the email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('✅ Email sent successfully:', info.messageId)
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully! 💕',
      messageId: info.messageId
    })

  } catch (error) {
    console.error('❌ Error sending email:', error)
    console.error('❌ Error stack:', error.stack)
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      response: error.response,
      responseCode: error.responseCode
    })
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message,
      code: error.code
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Email service is running',
    gmailConfigured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`)
  console.log(`📧 Email service available at http://localhost:${PORT}/api/send-email`)
  console.log(`🔍 Health check at http://localhost:${PORT}/api/health`)
})
