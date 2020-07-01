const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const { isLoggedIn } = require("./middleware"); // to check if user is loggedIn

router.get("/user", isLoggedIn, (req, res, next) => {
  console.log("yay it is working");
  res.status(200).json(req.session.loggedInUser);
});

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  if (!username || !email || !password) {
    res.status(500).json({
      errorMessage: "Please enter username, email and password",
    });
    return;
  }

  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).json({
      errorMessage: "Email format not correct",
    });
    return;
  }

  // const myPassRegex = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  // );
  // if (!myPassRegex.test(password)) {
  //   res.status(500).json({
  //     errorMessage:
  //       "Password needs to have 8 characters, a number and an Uppercase alphabet",
  //   });
  //   return;
  // }

  bcrypt.genSalt(12).then((salt) => {
    console.log("Salt: ", salt);
    bcrypt.hash(password, salt).then((passwordHash) => {
      UserModel.create({ email, username, passwordHash })
        .then((user) => {
          user.passwordHash = "***";
          req.session.loggedInUser = user;
          console.log(req.session);
          res.status(200).json(user);
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).json({
              errorMessage: "username or email entered already exists!",
            });
            return;
          } else {
            res.status(500).json({
              errorMessage: "Something went wrong! Go to sleep!",
            });
            return;
          }
        });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({
      error: "Please enter Username. email and password",
    });
    return;
  }
  console.log(password);
  // const myRegex = new RegExp();
  // /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
  // if (!myRegex.test(email)) {
  //   res.status(500).json({
  //     error: "Email format not correct",
  //   });
  //   return;
  // }

  // Find if the user exists in the database
  UserModel.findOne({ email })
    .then((userData) => {
      console.log(userData.passwordHash);
      //check if passwords match
      bcrypt
        .compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          //if it matches
          console.log(doesItMatch);
          if (doesItMatch) {
            // req.session is the special object that is available to you
            userData.passwordHash = "***";
            req.session.loggedInUser = userData;
            res.status(200).json(userData);
          }
          //if passwords do not match
          else {
            res.status(500).json({
              error: "Password doesn't match",
            });
            return;
          }
        })
        .catch(() => {
          res.status(500).json({
            error: "User not found ah",
          });
          return;
        });
    })
    //throw an error if the user does not exists
    .catch((err) => {
      res.status(500).json({
        error: "User not found",
        message: err,
      });
      return;
    });
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(204).send();
});

module.exports = router;
