class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword
          ? {
              title: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            }
          : {};
        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const querycopy = {...this.queryStr}

        // Removing some field for caegory
        const removeFields = ["keyword","page","limit"];
        // console.log(querycopy)
        removeFields.forEach(key=>delete querycopy[key]);
        // console.log(querycopy);

        // filter for range
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key =>`$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage*(currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;