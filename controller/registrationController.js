////////MAin////////


// const emailThemplate = require("../helpers/emailThemplate");
// const emailValidation = require("../helpers/emailValidation");
// const sendEmail = require("../helpers/sendEmail");
// const userList = require("../models/userSchema");
// const bcrypt = require("bcrypt");
// var jwt = require('jsonwebtoken');



//    async function  registrationController(req, res){
    
//     const { firstName, lastName, email,telephone, addressOne, addressTwo, city, postCode, division, district, password } = req.body
//     // console.log(req.body);

//     if(!firstName || !lastName){
//       return res.json({Error: "Firstname & lastname is required"})
//     }
//     if(!email){
//       return res.json({Error: "Email is required"})
//     }
//     if(!emailValidation(email)){
//       return  res.json({Error: "Email is not valid"}) 
//     }

//     const existingEmail =await userList.find({email});
//      // console.log(existingEmail)
//       if(existingEmail.length > 0) {
//         return  res.json({Error: "Email is already in use"}) 
//       };

//       //var token = jwt.sign({email}, 'Rasel');

//       bcrypt.hash(password, 10, function (err, hash) {

//         const users = new userList({
//           firstName, 
//           lastName, 
//           email,
//           telephone, 
//           addressOne, 
//           addressTwo, 
//           city, 
//           postCode, 
//           division, 
//           district, 
//           password : hash,
//           token: email   
//         }) 
//         users.save();
//          var token = jwt.sign({email}, 'Rasel');
//         sendEmail(email, 'OREBI', emailThemplate(token))
//         //res.json(users)
//       });
//       res.json({success: "Registration successfully done"})
      
  
// }


// module.exports = registrationController;


////////MAin////////





const emailTemplate = require("../helpers/emailThemplate");
const emailValidation = require("../helpers/emailValidation");
const sendEmail = require("../helpers/sendEmail");
const userList = require("../models/userSchema");
const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt
const jwt = require("jsonwebtoken");

async function registrationController(req, res) {
  const {
    firstName,
    lastName,
    email,
    telephone,
    addressOne,
    addressTwo,
    city,
    postCode,
    division,
    district,
    password,
  } = req.body;

  if (!firstName || !lastName) {
    return res.json({ Error: "Firstname & lastname are required" });
  }
  if (!email) {
    return res.json({ Error: "Email is required" });
  }
  if (!emailValidation(email)) {
    return res.json({ Error: "Email is not valid" });
  }

  const existingEmail = await userList.findOne({ email }); // Use findOne() instead of find()
  if (existingEmail) {
    return res.json({ Error: "Email is already in use" });
  }

  // Hash password with bcryptjs
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new userList({
    firstName,
    lastName,
    email,
    telephone,
    addressOne,
    addressTwo,
    city,
    postCode,
    division,
    district,
    password: hashedPassword,
    token: email, 
  });

  await newUser.save(); // Save user to database

  // Generate JWT Token
  const token = jwt.sign({ email }, "Rasel");

  // Send email with verification token
  sendEmail(email, "OREBI", emailTemplate(token));

  res.json({ success: "Registration successfully done" });
}

module.exports = registrationController;
