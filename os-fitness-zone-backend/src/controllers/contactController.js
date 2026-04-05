const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    console.log(`[Contact] Receiving message from ${email}`);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Send to admin's email
      subject: `OS Fitness - New Inquiry: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);
    console.log('[Contact] Email sent successfully');
    res.status(200).json({ message: 'Thank you for your message. We will get back to you shortly.' });
  } catch (error) {
    console.error('[Contact] Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.', error: error.message });
  }
};

module.exports = { sendContactEmail };
