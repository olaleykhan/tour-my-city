// @params the query below is the  TourModel query method while queryString is the req.query that came from the request query parameters
class APIFeatures {
  constructor(modelQuery, queryParams) {
    this.modelQuery = modelQuery;
    this.queryParams = queryParams;
  }

  filter() {
    const excludeQueries = ['page', 'offset', 'limit', 'fields', 'sort'];
    // copy the queries and save in params below
    const queryObject = { ...this.queryParams };
    // remnove keyworkds not meant for filtering
    excludeQueries.forEach((query) => delete queryObject[query]);
    // console.log(params);
    let queryStr = JSON.stringify(queryObject);
    // convert advanced filtering keywords to recognized keywords with regex
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    //1b. filter by using the mongoose find query method.
    // remember to store it in query and not call it directly so we can chain more query commands to it..
    this.modelQuery = this.modelQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(',').join(' ');
      this.modelQuery = this.modelQuery.sort(sortBy);
    } else {
      this.modelQuery = this.modelQuery.sort('-createdAt');
    }
    return this;
  }

  selectFields() {
    if (this.queryParams.fields) {
      const reqFields = this.queryParams.fields.split(',').join(' ');
      console.log(reqFields);
      this.modelQuery = this.modelQuery.select(reqFields);
    } else {
      this.modelQuery = this.modelQuery.select('-__V -imageCover');
    }
    return this;
  }

  paginate() {
    if (this.queryParams.page) {
      const limit = Number(this.queryParams.limit) || 2;
      const offset = (Number(this.queryParams.page) - 1) * limit || 1;
      // const numOfTours = await TourModel.countDocuments();
      // if (numOfTours < offset || queryParams.page < 1) {
      //   throw new Error(
      //     'Invalid page number. ensure page is within total number of tours'
      //   );
      // }
      this.modelQuery = this.modelQuery.skip(offset).limit(limit);
    }
    return this;
  }
}

module.exports = APIFeatures;
