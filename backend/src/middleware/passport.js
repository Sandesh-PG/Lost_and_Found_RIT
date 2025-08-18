import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../models/user.models.js'; // 1. Import your User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback" // This should match your route
  },
  // 2. This function runs after Google successfully authenticates the user
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 3. Check if a user already exists in your database with this Google ID
      let user = await UserModel.findOne({ googleId: profile.id });

      if (user) {
        // If the user exists, pass them to the next step
        return done(null, user);
      } else {
        // 4. If the user does NOT exist, create a new user in your database
        const newUser = await UserModel.create({
          googleId: profile.id,
          username: profile.displayName, // Or generate a unique one
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          profilePictureURL: profile.photos[0].value,
        });
        // Pass the newly created user to the next step
        return done(null, newUser);
      }
    } catch (error) {
      return done(error, false);
    }
  }
));

// This determines which data of the user object should be stored in the session.
// We'll store the user's MongoDB ID.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// This is used to retrieve the user object from the session.
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});
