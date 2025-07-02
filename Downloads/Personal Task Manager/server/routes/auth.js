const express = require('express');
const passport = require('passport');

const router = express.Router();

// @route   GET /auth/google
// @desc    Initiate Google OAuth2 login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /auth/google/callback
// @desc    Google OAuth2 callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: true,
  }),
  (req, res) => {
    // Redirect to frontend after successful login
    res.redirect('http://localhost:3000');
  }
);

// @route   GET /auth/logout
// @desc    Logout user
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return res.status(500).json({ message: 'Logout failed' }); }
    res.json({ message: 'Logged out' });
  });
});

// @route   GET /auth/user
// @desc    Get authenticated user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router; 