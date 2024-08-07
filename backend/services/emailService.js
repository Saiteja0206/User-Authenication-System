const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: 
           ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
    html: `<p>Please verify your email by clicking on the following link:</p>
           <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}">Verify Email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

const sendResetPasswordEmail = async (email, resetToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `Please reset your password by clicking on the following link:
           ${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
    html: `<p>Please reset your password by clicking on the following link:</p>
           <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Reset Password</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset password email sent');
  } catch (error) {
    console.error('Error sending reset password email:', error);
  }
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
