const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define("user",{
    userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    emailID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    phoneNo: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

module.exports = User;