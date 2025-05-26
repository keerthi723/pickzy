// middleware for maintaining promise issue 
module.exports=func=>(req,res,next)=>
  Promise.resolve(func(req,res,next)).catch(next)

