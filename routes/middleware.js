const isLoggedIn = (req, res, next) => {
  console.log(req.session.loggedInUser);
  if (req.session.loggedInUser) {
    next();
    console.log("it is working");
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

module.exports = {
  isLoggedIn,
};
