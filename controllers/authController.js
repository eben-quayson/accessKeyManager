const {
    signin: authServiceSignin,
    signup: authServiceSignup,
  } = require("../services/authService");
  const { verifyUser, findUserByVerificationToken } = require("../models/User");
  const AccessKey = require('../models/AccessKey')
  
  class AuthController {
    static renderSignUpForm(req, res) {
      res.render("signup");
    }
  
    static renderSignInForm(req, res) {
      res.render("signin");
    }
  
    static async signup(req, res) {
      try {
        const { email, password } = req.body;
        const user = await authServiceSignup(email, password);
        req.session.userId = email; // Store the email in the session
        req.session.isAdmin = user.isAdmin; // Optionally store if the user is an admin

        // Fetch user keys and all keys if admin
        const userKeys = await AccessKey.getKeysByUser(email);
        const allKeys = req.session.isAdmin ? await AccessKey.getAllKeys() : [];
        
        // Render the dashboard with the user data
        res.render("dashboard", {
          email,
          userKeys,
          allKeys,
          isAdmin: req.session.isAdmin,
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    static async signin(req, res) {
      try {
        const { email, password } = req.body;
        const user = await authServiceSignin(email, password);
        if (user) {
          req.session.userId = email; // Store the email in the session
          req.session.isAdmin = user.isAdmin; // Optionally store if the user is an admin
          // Fetch user keys and all keys if admin
          const userKeys = await AccessKey.getKeysByEmail(email);
          const allKeys = req.session.isAdmin ? await AccessKey.getAllKeys() : [];
          // Render the dashboard with the user data
          res.render("dashboard", {
            email,
            userKeys,
            allKeys,
            isAdmin: req.session.isAdmin,
          });
        } else {
          res.redirect("/auth/signin");
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
    static async verifyEmail(req, res) {
      try {
        const { token } = req.params;
        const user = await findUserByVerificationToken(token);
        if (user) {
          await verifyUser(user.email);
          res.send("Email verified successfully");
        } else {
          res.status(400).send("Invalid or expired token");
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    static async getDashboard(req, res) {
      try {
        const email = req.session.userId;
        const userKeys = await AccessKey.getKeysByEmail(email);
        const allKeys = req.session.isAdmin ? await AccessKey.getAllKeys() : [];
        res.render("dashboard", {
          email,
          userKeys,
          allKeys,
          isAdmin: req.session.isAdmin,
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    static signout(req, res) {
      req.session.destroy(() => {
        res.redirect("/auth/signin");
      });
    }
  }
  
  module.exports = AuthController;
