class APIPostsFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchAllFields() {
    const keyword = this.queryStr.get('keyword');
    // Define the conditions to search for the keyword in title, description, and category
    const searchConditions = {
      $or: [
        // Include condition to search by title
        { title: { $regex: keyword, $options: 'i' } },
        // Include condition to search by summary
        { summary: { $regex: keyword, $options: 'i' } },
        // Include condition to search by category
        { category: { $regex: keyword, $options: 'i' } },
      ],
    };

    // Use a temporary variable to hold the conditions
    const tempConditions = keyword
      ? { $and: [this.query._conditions || {}, searchConditions] }
      : this.query._conditions; // If no keyword, keep existing conditions
    // Set the conditions to this.query._conditions
    this.query._conditions = tempConditions;

    return this;
  }

  filter() {
    const queryCopy = {};
    this.queryStr.forEach((value, key) => {
      queryCopy[key] = value;
    });

    const removeFields = ['keyword', 'page', 'per_page', 'id'];
    removeFields.forEach((el) => delete queryCopy[el]);
    let prop = '';
    //Price Filter for gt> gte>= lt< lte<= in PRICE
    let output = {};
    for (let key in queryCopy) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        prop = key.split('[')[0];
        let operator = key.match(/\[(.*)\]/)[1];
        if (!output[prop]) {
          output[prop] = {};
        }

        output[prop][`$${operator}`] = queryCopy[key];
      }
    }
    this.query = this.query.find(output);

    return this;
  }

  pagination(resPerPage, currentPage) {
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIPostsFilters;
