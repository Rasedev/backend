  const nodemailer = require("nodemailer");


async function sendEmail(email, subject,template){
    const transporter = nodemailer.createTransport({
               service : "gmail",  
                auth: {
                  user: "rasedev32@gmail.com",
                  pass: "bqongebrkhxiclob",
                },
              }); 

              const info = await transporter.sendMail({
                from: '"OREBI 👻" <rasedev32@gmail.com>', 
                to: email, 
                subject: subject ,
                html: template, 
                
              });
              
}
 


module.exports = sendEmail;