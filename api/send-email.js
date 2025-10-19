// Free email service using Gmail SMTP - no third-party services needed!
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { recipientEmail, name, applicationData } = req.body

  // Validate required fields
  if (!recipientEmail || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Create Gmail transporter (completely free!)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD // Gmail App Password (not your regular password)
      }
    })

    // Handle photo - use embedded image for production
    let photoSection = ''
    if (applicationData.photo) {
      photoSection = `
        <div style="text-align: center; margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #FFB6C1, #FFC0CB); border-radius: 20px; border: 3px solid #FF7F7F; box-shadow: 0 10px 30px rgba(255, 127, 127, 0.3);">
          <h2 style="color: #FF7F7F; font-size: 28px; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">📸 PHOTO 📸</h2>
          <p style="color: #333; font-size: 18px; margin: 15px 0; font-weight: bold;">A photo was uploaded with this application!</p>
          <div style="background: #fff; padding: 25px; border-radius: 15px; margin: 20px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            <img src="${applicationData.photo}" alt="Their photo" style="max-width: 350px; max-height: 350px; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.3); border: 4px solid #FF7F7F;" />
          </div>
        </div>
      `
    } else {
      photoSection = `
        <div style="text-align: center; margin: 30px 0; padding: 30px; background: #f8f9fa; border-radius: 20px; border: 3px solid #ddd;">
          <h2 style="color: #FF7F7F; font-size: 28px; margin-bottom: 20px;">📸 PHOTO 📸</h2>
          <p style="color: #666; font-size: 18px;">No photo was uploaded with this application.</p>
        </div>
      `
    }

    // Create beautiful HTML email
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

    // Send email using Gmail (completely free!)
    const mailOptions = {
      from: process.env.GMAIL_USER, // Your Gmail address
      to: recipientEmail,
      subject: 'Your Cuddle Buddy Application Results! 💕',
      html: htmlContent
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('Email sent successfully:', info.messageId)
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully! 💕',
      messageId: info.messageId
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    })
  }
}
