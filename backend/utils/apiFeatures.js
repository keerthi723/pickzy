
// this apifeature is written to find particular products by using name field.
class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;

    };
//    search
    search(){
        
       let keyword= this.queryStr.keyword ? {
            name:{
                // mongodb query operator
                $regex:this.queryStr.keyword,
                // caseinsensitive
                $options:'i'
            }
        }:{};
        this.query.find({...keyword})
        return this;
    }
    // filter
    filter(){
        const queryStrCopy={...this.queryStr}
        
        const removeFields=['keyword','limit','page'];
        removeFields.forEach(field => delete queryStrCopy[field]);
    // price filter
    let queryStr=JSON.stringify(queryStrCopy);
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)/g,match=>`$${match}`)

    this.query.find(JSON.parse(queryStr));
    return this; 
    }
    // pagination
    paginate(resPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resPerPage*(currentPage-1);
        this.query.limit(resPerPage).skip(skip);
        return this;

    }
}

module.exports=APIFeatures;