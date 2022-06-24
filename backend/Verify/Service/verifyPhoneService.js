const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require("sequelize-cockroachdb");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const PhoneVerificationTable = require("../Models/phoneVerificationTable");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneVerificationSid = process.env.TWILIO_PHONE_VERIFICATION_SID;

const client = require('twilio')(accountSid, authToken);

class VerifyPhoneService{
    static async sendVerificationCode(phoneNo){
        try{
            const result = await sequelize.transaction(async (t) => {
                // const { sid } = await client.verify.services.create({
                //     friendlyName: "Account Verification",
                // });

                // // check if the phone number is already verified or not.
                // const phoneObj = await PhoneVerificationTable.findByPk(phoneNo,{ transaction:t });

                // if(phoneObj !== null){
                //     if(phoneObj.isVerified === true){
                //         throw new Error("Phone Number already verified.");
                //     }
                // }

                // const saveSid = await PhoneVerificationTable.upsert({
                //     phoneNo: phoneNo,
                //     sid: sid
                // },{ transaction:t });

                const resp = await client.verify.services(phoneVerificationSid)
                                        .verifications
                                        .create({
                                            to: phoneNo,
                                            channel: 'sms'
                                        });
                return resp;
                // console.log(resp);
            });
            return [true, true]
        } catch(error){
            // console.log(error);
            return [false, error.message];
        }
    }

    static async verifyVerificationCode(phoneNo, code){
        try{
            const result = await sequelize.transaction(async (t) => {
                // const phoneSid = await PhoneVerificationTable.findByPk(phoneNo, { transaction:t });

                // if(phoneSid === null){
                //     throw new Error("Generate code first!");
                // }

                // if(phoneSid.isVerified === true){
                //         throw new Error("Phone Number already verified.");
                // }

                const resp = await client.verify.services(phoneVerificationSid)
                                           .verificationChecks.create({
                                                to: phoneNo,
                                                code: code
                                            });
                // console.log(resp);
                if(resp.status !== 'approved'){
                    throw new Error("Verification Failed: Enter correct code");
                }

                // const updatePhoneObj = await PhoneVerificationTable.upsert({
                //     phoneNo: phoneNo,
                //     sid: phoneSid.sid,
                //     isVerified: true
                // });
            });
            return [true, true]
        } catch(error){
            // console.log(error);
            return [false, error.message];
        }
    }
}

// async function getRes(){
//     const r = await VerifyPhoneService.verifyVerificationCode('+919818130398', '756947');
//     console.log(r);
// }

// getRes();

module.exports = VerifyPhoneService;