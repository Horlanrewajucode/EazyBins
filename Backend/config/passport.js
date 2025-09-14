import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';

/**
 * Configure Google OAuth strategy.
 * This runs when Google redirects back with user profile info.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, 
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback' 
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in DB
    let user = await User.findOne({ googleId: profile.id });

    // If not, create a new user using Google profile info
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        photo: profile.photos[0].value,
        isVerified: true // Google verifies email, so we trust it
      });
    }

    // Pass user to next middleware
    return done(null, user);
  } catch (err) {
    // Pass error to Passport
    return done(err, null);
  }
}));
