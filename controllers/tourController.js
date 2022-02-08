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
  // console.log(req.query);

  // adding filtering to endpoint
  // we want to remove certain query params that wont be used for filtering. but careful to
  // create a new object and not mutate the curent object

  const excludeQueries = ['page', 'offset', 'limit', 'fields', 'sort'];
  // copy the queries and save in params below
  const params = { ...req.query };
  // remnove keyworkds not meant for filtering
  excludeQueries.forEach((query) => delete params[query]);
  console.log(params);
  let paramStr = JSON.stringify(params);
  // convert advanced filtering keywords to recognized keywords with regex
  paramStr = paramStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  //1b. filter by using the mongoose find query method.
  // remember to store it in query and not call it directly so we can chain more query commands to it..
  let query = TourModel.find(JSON.parse(paramStr));

  // 2. add sorting to it. add it conditionally if there is sorting in the request params

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // include or exclude certain fields from the request parameter
  // remember mongoose uses negative for inverse. adding - in front means you're trying to tghe the opposit

  if (req.query.fields) {
    const reqFields = req.query.fields.split(',').join(' ');
    console.log(reqFields);
    query = query.select(reqFields);
  } else {
    query = query.select('-__V -imageCover');
  }

  // call the actual query after they've all been chained

  try {
    // add pagination
    if (req.query.page) {
      const limit = Number(req.query.limit) || 2;
      const offset = (Number(req.query.page) - 1) * limit || 1;
      const numOfTours = await TourModel.countDocuments();
      if (numOfTours < offset || req.query.page < 1) {
        throw new Error(
          'Invalid page number. ensure page is within total number of tours'
        );
      }
      query = query.skip(offset).limit(limit);
    }
    const tours = await query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'something went wrong. could not get tours',
      console: error,
    });
  }
};

exports.getTourByID = async (req, res) => {
  try {
    const tour = await TourModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(501).json({
      status: 'failed',
      message: ' something went wrong. can not get single tour',
      console: err,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(501).json({
    status: success,
    message: 'Update Tour Enpoint is not ready for consumption',
  });
};

exports.deleteTour = async (req, res) => {
  console.log(req.param);
  try {
    await TourModel.findByIdAndDelete(req.params.id);
    res.status(201).json(null);
  } catch (error) {
    console.log(error);

    res.status(501).json({
      status: 'failed',
      message: ' something went wrong. can not delete tour',
      console: err,
    });
  }
};