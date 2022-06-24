const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Notification = sequelize.define("notification",{
    notificationID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notificationContent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notificationStatus: {
        type: Sequelize.ENUM('SENT', 'PENDING', 'FAILURE'),
        defaultValue: 'PENDING',
        allowNull: false
    }
});

module.exports = Notification;