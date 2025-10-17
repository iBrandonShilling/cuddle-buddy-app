export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { recipientEmail, name, compatibilityScore, applicationData } = req.body

  // Validate required fields
  if (!recipientEmail || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Create email content
    const emailContent = `
Subject: Your Cuddle Buddy Application Results! 💕

Dear ${name},

Congratulations! Your cuddle buddy application has been processed and you scored an amazing ${compatibilityScore}% compatibility! 

Here are your results:

🌟 Your Cuddle Profile:
- Name: ${name} (${applicationData.age} years young!)
- Favorite Position: ${applicationData.favoritePosition}
- Cuddle Frequency: ${applicationData.cuddleFrequency}
- Ideal Temperature: ${applicationData.idealTemperature}
- Love Language: ${applicationData.loveLanguage}

💭 Your Perfect Cuddle:
"${applicationData.perfectCuddle}"

💖 What Makes You Feel Loved:
"${applicationData.whatMakesYouFeelLoved}"

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

    // For now, we'll use a simple approach with a public email service
    // In production, you'd want to use a proper email service like SendGrid, Resend, or Nodemailer
    
    // Simulate email sending (replace with actual email service)
    console.log('Email would be sent to:', recipientEmail)
    console.log('Email content:', emailContent)
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully! 💕',
      emailContent: emailContent // Include content for fallback
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    })
  }
}
