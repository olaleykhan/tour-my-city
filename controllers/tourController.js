const TourModel = require('../models/tourModel');

const success = "success";


exports.addTour = async (req, res) => {

  try {
        const tour = await TourModel.create(req.body);
        res.status(201).json({
          status: 'success',
          data: {
            message: 'Tour was succesffully created',
            tour,
          },
        });
    
  } catch (err) {
    console.log(err);
     res.status(404).json({
       status: "failed",
       message: "Data sent is invalid",
       console: err,
     });
    
  }  
};

exports.getAllTours = async (req, res) => {
    try {
const tours = await TourModel.find({});
     res.status(200).json({
       status: 'success',
       results: tours.length,
       data: {
         tours,
       },
     });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "something went wrong. could not get tours"
      })
    
  }
 
};

exports.getTourByID = async (req, res) => {
  try {    
    const tour = await TourModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { tour   }
    });    
  } catch (err) {
     res.status(501).json({
       status: "failed",
       message: ' something went wrong. can not get single tour',
       console: err,
     });    
  } 
}

exports.updateTour = (req, res) => {
  res.status(501).json({
    status: success,
    message: "Update Tour Enpoint is not ready for consumption"
  })

}

exports.deleteTour = (req, res) => {
  res.status(501).json({
    status: success,
    message: " Delete Tour Enpoint is not ready for consumption"
  })

}