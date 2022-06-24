const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const PhoneVerificationTable = sequelize.define("phoneVerificationTable",{
    phoneNo: {
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

module.exports = PhoneVerificationTable;