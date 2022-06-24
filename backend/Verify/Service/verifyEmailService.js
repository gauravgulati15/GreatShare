const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require("sequelize-cockroachdb");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const EmailVerificationTable = require("../Models/emailVerificationTable");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const emailVerificationSid = process.env.TWILIO_EMAIL_VERIFICATION_SID;

const client = require('twilio')(accountSid, authToken);

class VerifyEmailService{
    static async sendVerificationCode(emailID){
        try{
            const result = await sequelize.transaction(async (t) => {
                // const { sid } = await client.verify.services.create({
                //     friendlyName: "Account Verification",
                // });

                // check if the email is already verified or not.
                // const emailObj = await EmailVerificationTable.findByPk(emailID,{ transaction:t });

                // if(emailObj !== null){
                //     if(emailObj.isVerified === true){
                //         throw new Error("Email already verified.");
                //     }
                // }

                // const saveSid = await EmailVerificationTable.upsert({
                //     emailID: emailID,
                //     sid: sid
                // },{ transaction:t });

                const resp = await client.verify.services(emailVerificationSid)
                                        .verifications
                                        .create({ to: emailID, channel: 'email'});
                // console.log(resp);
                return resp;
                // console.log(resp);
            });
            return [true, true]
        } catch(error){
            console.log(error);
            return [false, error.message];
        }
    }

    static async verifyVerificationCode(emailID, code){
        try{
            const result = await sequelize.transaction(async (t) => {
                // const emailSid = await EmailVerificationTable.findByPk(emailID, { transaction:t });

                // if(emailSid === null){
                //     throw new Error("Generate code first!");
                // }

                // if(emailSid.isVerified === true){
                //         throw new Error("Email-id already verified.");
                // }

                const resp = await client.verify.services(emailVerificationSid)
                                           .verificationChecks.create({
                                                to: emailID,
                                                code: code
                                            });
                // console.log(resp);
                if(resp.status !== 'approved'){
                    throw new Error("Verification Failed: Enter correct code");
                }

                // const updatePhoneObj = await EmailVerificationTable.upsert({
                //     emailID: emailID,
                //     sid: emailSid.sid,
                //     isVerified: true
                // });
            });
            return [true, true]
        } catch(error){
            // console.log(error);
            return [false, error.message];
        }
    }

    // static async getEmails(){
    //     try {
    //         const result = await sequelize.transaction(async (t) => {
    //             const users = await EmailVerificationTable.findAll({}, { transaction: t });

    //             return users;
    //         });
    //         return [true, result];
    //     } catch (error) {
    //         return [false, error.message];
    //     }
    // }
}

module.exports = VerifyEmailService;