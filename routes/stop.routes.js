const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const TripModel = require("../models/trip.model");
const StopModel = require("../models/stop.model");

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
//                          STOP DISPLAY
// ------------------------------------------------------------

router.get("/trip/:trip_id/stops", (req, res) => {
  //looks into the trip model and find the trips whose user_id matched the user loggedIn id
  StopModel.find({ trip_id: req.params.trip_id })
    .then((stops) => {
      res.status(200).json(stops);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// ------------------------------------------------------------
//                          STOP CREATE
// ------------------------------------------------------------

router.post("/createStop", (req, res) => {
  const {
    location,
    name,
    description,
    startDate,
    pictures,
    trip_id,
  } = req.body;
  console.log(req.body);
  StopModel.create({
    location: location,
    name: name,
    description: description,
    startDate: startDate,
    pictures: pictures,
    trip_id: trip_id,
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
//                          STOP DELETE
// ------------------------------------------------------------

router.delete("/stops/:id", (req, res) => {
  StopModel.findByIdAndDelete(req.params.id)
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
//                          STOP UPDATE
// ------------------------------------------------------------

router.patch("/editStop/:id", (req, res) => {
  let id = req.params.id;
  const { location, name, description, startDate, pictures } = req.body;
  StopModel.findByIdAndUpdate(id, {
    $set: {
      location: location,
      name: name,
      description: description,
      startDate: startDate,
      pictures: pictures,
    },
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
