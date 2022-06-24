const NotificationService = require("../Service/notificationService");

class NotificationController {
    static async getAllNotifications(req, res, next){
        const [flag, resp] = await NotificationService.getAllNotifications();
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async deleteNotification(req, res, next){
        const [flag, resp] = await NotificationService.deleteNotification(req.params.notificationID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(true);
    }
}

module.exports = NotificationController;