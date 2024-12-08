const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session"); // Import express-session
const connectDB = require("./config/db");
const visitorRoutes = require("./routes/visitorRoutes");
const visitationRequestRoutes = require("./routes/visitationRequestRoutes"); // Import visitation request routes
const guidelineRoutes = require("./routes/guidelineRoutes"); // Import guideline routes
const User = require("./models/User"); // Import the User model
const prisonerRoutes = require("./routes/prisonerRoutes");

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());

// Session Middleware: Enable session support
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // Secret key for signing the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Create a session for uninitialized users
    cookie: { secure: false }, // For local development, set secure to false (for production, you may want to enable HTTPS and set secure to true)
  })
);

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Enable sessions

// Google OAuth Setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new one
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.photos ? profile.photos[0].value : null, // Use profile picture if available
          });

          // Save the new user to the database
          await user.save();
        }

        // Pass the user object to the next step (serialization)
        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err, null); // In case of an error
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Define Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Request Google profile and email scope
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect to homepage or dashboard after successful authentication
    res.redirect("/");
  }
);

// Define your other routes
app.use("/api/visitors", visitorRoutes); // Existing visitor routes
app.use("/api/visitation-request", visitationRequestRoutes); // New route for visitation requests
app.use("/api/guidelines", guidelineRoutes); // New route for guidelines
app.use("/api/prisoners", prisonerRoutes);

// Serve Privacy Policy Page
app.get("/privacy-policy", (req, res) => {
  res.send(`
    <h1>Privacy Policy</h1>
    <p>Your privacy is important to us. This is a placeholder privacy policy.</p>
  `);
});

// Serve Terms of Service Page
app.get("/terms-of-service", (req, res) => {
  res.send(`
    <h1>Terms of Service</h1>
    <p>These are the placeholder terms of service for testing purposes.</p>
  `);
});

// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
