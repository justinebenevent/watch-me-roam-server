const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const TripModel = require("../models/trip.model");

router.get("/trips", (req, res) => {
  //looks into the trip model and find the trips whose user_id matched the user loggedIn id
  TripModel.find({ user_id: req.session._id })
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

router.post("/create", (req, res) => {
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

router.patch("/trips/:id", (req, res) => {
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

router.get("/stops", (req, res) => {
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

router.post("/create", (req, res) => {
  const { location, name, description, startDate, pictures } = req.body;
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

router.patch("/trips/:id", (req, res) => {
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
