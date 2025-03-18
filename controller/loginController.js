////////MAin////////

// const emailValidation = require("../helpers/emailValidation");
// const userList = require("../models/userSchema");
// const bcrypt = require("bcrypt");

// async function loginController(req, res) {
//   const { email, password } = req.body;
//   if (!email) {
//     return res.json({ Error: "Email is required" });
//   }
//   if (!emailValidation(email)) {
//     return res.json({ Error: "Email is not valid" });
//   }
//   if(!password) {
//      return res.json({error: "Password is required"});
//   }

//   const existingEmail = await userList.find({ email });
//    //console.log(existingEmail);

//   if (existingEmail.length > 0) {
//     //console.log(existingEmail[0].password);
//     bcrypt.compare(password, existingEmail[0].password).then(function (result) {
//       if (result) {
//          //res.json({ success: "login successfully done" });
//         // console.log(result);
//         // console.log(existingEmail[0].role);
//         res.send({
//           success: "login successfully done",
//           email: existingEmail[0].email,
//           role: existingEmail[0].role,
//         })
//       } else {
//         res.json({ error: "password is not matched" });
//       }
//     });
//   // } else {
//   //   res.json({ error: "Email is not valid" });
//   // }
// }
// }


// module.exports = loginController;


////////MAin////////


const emailValidation = require("../helpers/emailValidation");
const userList = require("../models/userSchema");
const bcrypt = require("bcryptjs");  // Use bcryptjs instead of bcrypt

async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.json({ Error: "Email is required" });
  }
  if (!emailValidation(email)) {
    return res.json({ Error: "Email is not valid" });
  }
  if (!password) {
    return res.json({ Error: "Password is required" });
  }

  const existingEmail = await userList.findOne({ email }); // Use findOne() instead of find()

  if (!existingEmail) {
    return res.json({ Error: "Email is not registered" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, existingEmail.password);

  if (isMatch) {
    res.json({
      success: "Login successfully done",
      email: existingEmail.email,
      role: existingEmail.role,
    });
  } else {
    res.json({ Error: "Password is not matched" });
  }
}

module.exports = loginController;


