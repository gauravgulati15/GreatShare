const { Sequelize } = require("sequelize-cockroachdb");
const User = require("../Models/userTable");
const NotificationService = require("../../Notification/Service/notificationService");
const EmailTemplates = require("../../Notification/emailTemplates");

const sequelize = new Sequelize(process.env.DATABASE_URL);

class UserService {
    static async createUser(data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const user = await User.create({
                    username: data.username,
                    emailID: data.emailID,
                    phoneNo: data.phoneNo,
                    password: data.password
                }, { transaction: t});

                // Send user added success notifcation
                const message = EmailTemplates.generateUserAddedTemplate({to: data.emailID, username: data.username});
                const notification = await NotificationService.sendNotificationEmail(message);

                return user;
            });
            return [true, result];
        } catch (error) {
            // console.log(error.message);
            return [false, error.message];
        }
    }

    static async getAllUsers(){
        try {
            const result = await sequelize.transaction(async (t) => {
                const users = await User.findAll({
                    attributes: ['userID', 'username', 'emailID', 'phoneNo', 'password']
                }, { transaction: t });

                return users;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async deleteUser(userID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const user = await User.destroy({
                    where: {
                        userID: userID
                    }
                }, { transaction: t });

                return user;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getUserDetailsByUserID(userID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const user = await User.findByPk(userID, { 
                    raw: true,
                    nest: true,
                    attributes: ['userID', 'username', 'emailID', 'phoneNo'],
                    transaction: t 
                });

                if(user === null){
                    throw new Error("The user does not exist.");
                }

                return user;
            });
            return [true, result];
        } catch (error) {
           return [false, error.message];
        }
    }

    static async getUserDetailsByEmailID(emailID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const user = await User.findOne({
                    where: {
                        emailID: emailID
                    }
                }, { 
                    raw: true,
                    nest: true,
                    attributes: ['userID', 'username', 'emailID', 'phoneNo', 'password'],
                    transaction: t 
                });

                if(user === null){
                    throw new Error("The user does not exist.");
                }

                return user;
            });
            return [true, result];
        } catch (error) {
           return [false, error.message];
        }
    }

    static async updateUserDetails(userID, data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const findUser = await User.findByPk(userID, { transaction: t });

                if(findUser === null){
                    throw new Error("The user does not exist.");
                }

                const user = await User.upsert({
                    userID: userID,
                    username: data.username,
                    phoneNo: data.phoneNo,
                    emailID: data.emailID
                }, { transaction: t });

                // Send user updated success notification
                const message = EmailTemplates.generateUserUpdatedTemplate({to:data.emailID, username: data.username});
                const notification = await NotificationService.sendNotificationEmail(message);

                return user;
            });
            if(result === false){
                return [false, "User does not exist."];
            }
            return [true, true];
        } catch (error) {
            return [false, error.message];
        }
    }
}

module.exports = UserService;