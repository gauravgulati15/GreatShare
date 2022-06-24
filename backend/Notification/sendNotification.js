const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(accountSid);
// console.log(process.env.PASSWORD);
const twilio = require("twilio")(accountSid, authToken);

const name = "Gaurav";
const text = `Hi ${name}! \nGood Night :)\nFrom Gaurav`

twilio.messages.create({
    from: "whatsapp:+19897689460",
    to: "whatsapp:+919013009813",
    body: text
})
.then((res)=>{
    console.log("Message Sent");
    console.log(res);
})
.catch((error)=>{
    console.log(error);
})