const VerifyPhoneService = require("../Service/verifyPhoneService");
const VerifyEmailService = require("../Service/verifyEmailService");

class VerifyController {
    static async sendVerificationCode(req, res, next){
        const [flag, resp] = await VerifyPhoneService.sendVerificationCode(req.body.phoneNo);
        if(flag === false){
            res.status(404).send(resp);
        }
        res.send(resp);
    }

    static async verifyVerificationCode(req, res, next){
        const [flag, resp] = await VerifyPhoneService.verifyVerificationCode(req.body.phoneNo, req.body.code);
        if(flag === false){
            res.status(404).send(resp);
        }
        res.send(resp);
    }

    static async sendEmailVerificationCode(req, res, next){
        const [flag, resp] = await VerifyEmailService.sendVerificationCode(req.body.emailID);
        if(flag === false){
            res.status(404).send(resp);
        }
        res.send(resp);
    }

    static async verifyEmailVerificationCode(req, res, next){
        const [flag, resp] = await VerifyEmailService.verifyVerificationCode(req.body.emailID, req.body.code);
        if(flag === false){
            res.status(404).send(resp);
        }
        res.send(resp);
    }

    // static async getAllEmails(req, res, next){
    //     const [flag, resp] = await VerifyEmailService.getEmails();
    //     if(flag === false){
    //         res.status(404).send(resp);
    //     }
    //     res.send(resp);
    // }
}

module.exports = VerifyController;