const tourModel = require("../models/userModel");



exports.getAllUsers = async (req, res) => {
  try {
    const tours = await tourModel.find({});

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });  
  
} catch (err) {
  res.status(400).json({
    status: "failed",
    message: "something went wrong while getting all users"
  })

  
}

  
    
}
exports.getUserbyID = async (req, res) => {

  try {
      const tour = await tourModel.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "error, resource not found"
    })
    
  }


    
}
exports.AddUser = (req, res)=> {
  res.status(200).json({message: 'endpoint has not been implemented'})
    
}

exports.updateUser = (req, res)=> {
  res.status(200).json({message: 'endpoint has not been implemented'})
    
}