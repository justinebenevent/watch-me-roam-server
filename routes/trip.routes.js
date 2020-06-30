const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const TripModel = require("../models/trip.model");

// // protected sites middleware
// router.use((req, res, next) => {
//   if (req.session.passport) {
//     req.session.loggedInUser = req.session.passport.user;
//   }
//   if (req.session.loggedInUser) {
//     next();
//   } else {
//     res.redirect("/signin");
//   }
// });

// // logout middleware, connected whith "destroys session"
// router.use(function (req, res, next) {
//   res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
//   next();
// });

// ------------------------------------------------------------
//                          TRIP DISPLAY
// ------------------------------------------------------------
router.get("/home", (req, res) => {
  //looks into the trip model and find the trips whose user_id matched the user loggedIn id
  console.log(req.session);
  TripModel.find({ user_id: 123 })
    .then((trips) => {
      res.status(200).json(trips);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// ------------------------------------------------------------
//                          TRIP CREATE
// ------------------------------------------------------------

router.post("/createTrip", (req, res) => {
  const { name, description, startDate } = req.body;
  console.log(req.body);
  TripModel.create({
    name: name,
    description: description,
    startDate: startDate,
    user_id: 123,
  })
    .then((response) => {
      console.log("it is working");
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// ------------------------------------------------------------
//                          TRIP DELETE
// ------------------------------------------------------------

router.delete("/trips/:id", (req, res) => {
  TripModel.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// ------------------------------------------------------------
//                          TRIP UPDATE
// ------------------------------------------------------------

router.patch("/editTrip/:id", (req, res) => {
  let id = req.params.id;
  const { name, description, startDate } = req.body;
  TripModel.findByIdAndUpdate(id, {
    $set: { name: name, description: description, startDate: startDate },
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

module.exports = router;
