const mongoose = require('mongoose');


// create the schema for tour
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: [true, 'Tour name must be unique'],
  },
  duration: {
    type: Number,
    required: [true, 'A Tour Duration is required'],
  },
  maxGroupSize: {
    type: Number,
    required: [
      true,
      'you must specify maximum number of peole that can be in this tour',
    ],
  },
  dificulty: {
    type: String,
    required: [true, 'dificulty level is required'],
    default: "EASY"
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsNumber: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Price of the tour is required. please attach'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, " a Tour must have a summary"]
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "a tour must have an image cover"]
  },
  images: {
    type: [String],
    // required: tru
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: {
     type: [Date]
   }
});



// create the model for tour
const TourModel = mongoose.model('Tour', tourSchema);

// const newTour = new TourModel({
//     name: "Ajanlekoko forest",
//     rating: 0.67,
//     price: "780500"
// })


module.exports = TourModel;
