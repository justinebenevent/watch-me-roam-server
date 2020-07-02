const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const TripModel = require("../models/trip.model");
const StopModel = require("../models/stop.model");

const { isLoggedIn } = require("./middleware");

// // logout middleware, connected whith "destroys session"
// router.use(function (req, res, next) {
//   res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
//   next();
// });

// ------------------------------------------------------------
//                          STOP DISPLAY
// ------------------------------------------------------------

router.get("/tripOverview/:tripId", isLoggedIn, (req, res) => {
  //looks into the trip model and find the trips whose user_id matched the user loggedIn id
  StopModel.find({ trip_id: req.params.tripId })
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

router.post("/createStop", isLoggedIn, (req, res) => {
  const { location, name, description, startDate, image, tripId } = req.body;
  console.log(req.body);
  StopModel.create({
    location: location,
    name: name,
    description: description,
    startDate: startDate,
    image: image,
    trip_id: tripId,
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

router.delete("/stopDetails/:id", isLoggedIn, (req, res) => {
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

router.get("/editStop/:id", isLoggedIn, (req, res) => {
  console.log(req.params.id);
  StopModel.findById(req.params.id)
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.patch("/editStop/:id", isLoggedIn, (req, res) => {
  let id = req.params.id;
  const { location, name, description, startDate, image } = req.body;
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

router.get("/stopDetails/:id", isLoggedIn, (req, res) => {
  StopModel.findById(req.params.id)
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

module.exports = router;
