const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await UserController.register(username, email, password);

    if (result.success) {
      res.json({ success: true, message: 'Registration successful. Please check your email to verify your account.' });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserController.login(email, password);

    if (result.success) {
      res.json({ success: true, message: 'Login successful', data: result.data });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/request-password-reset', async (req, res) => {
  try {
    const { email } = req.body;
    const result = await UserController.requestPasswordReset(email);

    if (result.success) {
      res.json({ success: true, message: 'Password reset link sent to your email.' });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await UserController.resetPassword(token, password);

    if (result.success) {
      res.json({ success: true, message: 'Password reset successful. Please login.' });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/verify-email/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const result = await UserController.verifyEmail(token);

    if (result.success) {
      res.redirect('/login?message=Email verification successful. You can now log in.');
    } else {
      res.redirect('/login?message=' + encodeURIComponent(result.message));
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

