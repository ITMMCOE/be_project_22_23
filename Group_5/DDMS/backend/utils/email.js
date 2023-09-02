const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "ddms@gmail.com",
    pass: "45BE6C673FE3A81068EEBDBF17DD94770915",
  },
});

const sendMail = (email, subject, msg) => {
  message = {
    from: "mitalichougule2019.it@mmcoe.edu.in",
    to: email,
    subject: subject,
    text: msg,
  };
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.res);
    }
  });
};

module.exports = { sendMail };

// const client = require('twilio')('your_twilio_account_sid', 'your_twilio_auth_token');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('your_sendgrid_api_key');

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey("");

// const sendMail = (email, subject, msg) => {
    // const message = {
    //     to: "mitalichougule21@gmail.com",
    //     from: "mitalichougule21@gmail.com",
    //     subject: "ddms",
    //     text: "msg",
    // };
    // sgMail
    // .send(message)
    // .then(()=>{
    //     console.log("email sent");
    // })
    // .catch((error)=>{
    //     console.log(error);
    // })
// };

// module.exports = { sendMail };

// const message = {
//       to: "ddmsIt@yahoo.com",
//       from: "ddmsIt@yahoo.com",
//       subject: "ddms",
//       text: "msg",
//   };
//   sgMail
//   .send(message)
//   .then(()=>{
//       console.log("email sent");
//   })
//   .catch((error)=>{
//       console.log(error);
//   })
