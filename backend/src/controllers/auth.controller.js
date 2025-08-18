import UserModel from '../models/user.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

/*
* NOTE FOR GOOGLE SIGN-UP:
* To populate fields like `firstName`, `lastName`, and `profilePictureURL`
* during a Google sign-up, you must update your Passport.js strategy file
* (e.g., `passport-setup.js`). Map the data from the Google `profile` object
* to your new user model fields when a new user is created.
* For example:
* firstName: profile.name.givenName,
* lastName: profile.name.familyName,
* profilePictureURL: profile.photos[0].value,
*/


// --- FORGOT/RESET PASSWORD CONTROLLERS ---

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      // To prevent email enumeration, we send a success response even if the user doesn't exist.
      return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }
    
    // Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token and set it on the user model
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    // Set an expiration time for the token (e.g., 10 minutes)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
    await user.save();

    // Create the reset URL for the frontend
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    // --- Send the email ---
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: '"LostAndFound-RIT" <no-reply@yourapp.com>',
        to: user.email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click this <a href="${resetURL}">link</a> to reset your password. This link is valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });

  } catch (error) {
    // In case of an error, clear the token fields to be safe
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
    }
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: 'An error occurred while sending the password reset email.' });
  }
};

export const resetPasswordController = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Hash the token from the URL to match the one stored in the DB
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find the user by the hashed token and check if it's not expired
        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired.' });
        }

        // Set the new password
        user.password = await bcrypt.hash(password, 10);
        // Clear the reset token fields
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully.' });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
};


// --- AUTHENTICATION CONTROLLERS ---

export const SignUpController = async (req, res) => {
  try {
    // Destructure all fields from the request body
    const { username, email, password, firstName, lastName, contactNumber, profilePictureURL } = req.body;

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with all provided fields
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      contactNumber,
      profilePictureURL,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(201)
      .json({ message: 'User registered', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { loginIdentifier, password } = req.body;
    console.log("Attempting to log in user:", loginIdentifier);

    // --- THIS IS THE FIX ---
    // We are making the search case-insensitive to prevent login failures
    // due to capitalization differences (e.g., "Yashwanth" vs "yashwanth").
    const user = await UserModel.findOne({
      $or: [
        { email: { $regex: `^${loginIdentifier}$`, $options: 'i' } },
        { username: { $regex: `^${loginIdentifier}$`, $options: 'i' } }
      ],
    });
    // --- END FIX ---

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    if (!user.password) {
        return res.status(400).json({ 
            message: 'This account was created using Google. Please use the "Sign in with Google" button.' 
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error! Please try again.' });
  }
};


export const logoutController = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out successfully.' });
};

// --- UPDATED GOOGLE CONTROLLER ---
export const googleCallbackController = async (req, res) => {
  try {
    // The user profile is attached to req.user by the Passport.js middleware
    const user = req.user;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // --- THIS IS THE FIX ---
    // Instead of setting a cookie, we pass the token directly in the redirect URL.
    // The frontend will be responsible for grabbing and storing it.
    res.redirect(`http://localhost:5173/oauth-callback?token=${token}`);
    // --- END FIX ---

  } catch (error) {
    console.error('Error in Google OAuth callback:', error);
    res.redirect('http://localhost:5173/login?error=true');
  }
};

// ... (the rest of your controller functions remain the same)

// --- SIMPLIFIED GETPROFILE CONTROLLER ---
export const getProfile = async (req, res) => {
  try {
    // The full user object (minus password) is already attached to the request 
    // by the protectRoute middleware. We just need to send it back.
    res.status(200).json(req.user);
  } catch (error) {
    console.error('Error in getProfile controller:', error.message);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
