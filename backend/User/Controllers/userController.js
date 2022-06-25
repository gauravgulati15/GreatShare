const UserService = require("../Service/userService");

class UserController {
    static async getAllUsers(req, res, next){
        const [flag, resp] = await UserService.getAllUsers();
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async createUser(req, res, next){
        // TODO: encrypt the password and then send the data
        const [flag, resp] = await UserService.createUser(req.body);
        if(flag === false){
            res.status(400).send("Account on this email already exists. Kindly use another email.");
        }
        res.send(true);
    }

    static async getUserDetailsByUserID(req, res, next){
        const [flag, resp] = await UserService.getUserDetailsByUserID(req.params.userID);
        if(flag === false){
            res.status(500).send(resp);
        }
        if(resp.length === 0){
            res.status(404).send("User does not exist.");
        }
        res.send(resp);
    }

    static async getUserDetailsByEmailID(req, res, next){
        const [flag, resp] = await UserService.getUserDetailsByEmailID(req.params.emailID);
        if(flag === false){
            res.status(500).send(resp);
        }
        if(resp.length === 0){
            res.status(404).send("User does not exist.");
        }
        res.send(resp);
    }

    static async deleteUser(req, res, next){
        const [flag, resp] = await UserService.deleteUser(req.params.userID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(true);
    }

    static async updateUserDetails(req, res, next){
        const [flag, resp] = await UserService.updateUserDetails(req.params.userID, req.body);
        if(flag === false){
            res.status(404).send(resp);
        }
        res.send(resp);
    }
}

module.exports = UserController;