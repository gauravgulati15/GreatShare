const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const EmailVerificationTable = sequelize.define("emailVerificationTable",{
    emailID: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    sid: {
        type: Sequelize.STRING
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = EmailVerificationTable;