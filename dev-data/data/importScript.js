const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const TourModel = require("../../models/tourModel")

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('succesffully connected to remote database'))
    .catch((err) => console.log(err));
  
    // read the json file in our file system

const tour = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
    
// write the function that uploads the file data to the DB;
const upload = async () => {
    try {
       await TourModel.create(tour);
        console.log("Files successfully uploaded");
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

// delete data from DB

const wipeDB = async () => {
    try {
        await TourModel.deleteMany()
        console.log("Database has been successfully deleted. you're now in trouble. Haq!")
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] === '--delete') {
    wipeDB()
} else if (process.argv[2] === '--upload') {
    upload();
} else {
    process.exit();
}
// console.log(process.argv)
// const port = process.env.PORT;

// app.listen(port, () => console.log('always listening at ', port));
