var jwt = require('jsonwebtoken');
const userlist = require ("../models/userSchema")
 

async function emailverifiedController(req, res){

    // console.log('ok')
    //  console.log(req.headers.authorization);
     const {authorization} = req.headers;
     var decoded = jwt.verify(authorization, 'Rasel');  
     //console.log(decoded.email )
     const updateUser = await userlist.findOneAndUpdate(
        {email: decoded.email},
         {emailverified: true},
        {new: true}
        )  
       // res.json(updateUser)
    res.json({success: "Email Verification successfully done"})
};

 async function emailVerificationController(req,res){
      const {id} = req.params;
       //console.log(id)
      var decoded = jwt.verify(id, 'Rasel');
      //console.log(decoded);
      if(decoded){
        // const updateUser = await userlist.findOneAndUpdate(
         await userlist.findOneAndUpdate(
            {email: decoded.email},
             {emailverified: true, $unset: { token: "" }},
            {new: true}
            )             
      }
      res.redirect("http://localhost:5173/login")
  };




module.exports = {emailverifiedController, emailVerificationController};
