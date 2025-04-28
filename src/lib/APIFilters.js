class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchAllFields() {
    const keyword = this.queryStr.get("keyword");

    // Define the conditions to search for the keyword in title, description, and category
    const searchConditions = {
      $or: [
        { "packingTwo.es": { $regex: keyword, $options: "i" } },
        { "packingTwo.en": { $regex: keyword, $options: "i" } },
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

    const removeFields = ["keyword", "page", "per_page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    let prop = "";
    const output = {};

    for (let key in queryCopy) {
      // Handle range filters (gt, gte, lt, lte)
      if (key.match(/\b(gt|gte|lt|lte)/)) {
        prop = key.split("[")[0];
        const operator = key.match(/\[(.*)\]/)[1];
        if (!output[prop]) {
          output[prop] = {};
        }
        output[prop][`$${operator}`] = queryCopy[key];
      }

      // Handle other filters
      else {
        output[key] = queryCopy[key];
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

export default APIFilters;
