// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: '', // Change to your recipient
  from: 'espadas1505@engineer.com', // Change to your verified sender
  template_id: "d-a5622a0c3ac9408e84a84ad34647a0f2",
  dynamic_template_data: {
    username: "",
    postName: "Testing",
    commentName: ""
  }
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })