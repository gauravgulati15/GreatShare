const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require("sequelize-cockroachdb");
const Notification = require("../Models/notificationTable");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sequelize = new Sequelize(process.env.DATABASE_URL);

class NotificationService {
    static async createNotification(data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const notification = await Notification.create({
                    userID: data.userID,
                    notificationContent: data.notificationContent
                }, { transaction: t});

                return notification;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getAllNotifications(){
        try {
            const result = await sequelize.transaction(async (t) => {
                const notifications = await Notification.findAll({}, { transaction: t });

                return notifications;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async updateNotificationStatus(notificationID, data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const findNotification = await Notification.findByPk(notificationID, { transaction: t });

                if(findNotification === null){
                    throw new Error("The notification does not exist.");
                }

                const res = await Notification.upsert({
                    notificationID: notificationID,
                    userID: data.userID,
                    notificationContent: data.notificationContent,
                    notificationStatus: data.notificationStatus
                }, { transaction: t });

                return res;
            });
            if(result === false){
                return [false, "Notification does not exist."];
            }
            return [true, true];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async deleteNotification(notificationID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const notification = await Notification.destroy({
                    where: {
                        notificationID: notificationID
                    }
                }, { transaction: t });

                return notification;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async sendNotificationEmail(msg){
        try {
            const r = await sgMail.send(msg);
            return true;
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = NotificationService;