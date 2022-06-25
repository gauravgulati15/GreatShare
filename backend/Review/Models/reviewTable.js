const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Review = sequelize.define("review",{
    postID: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    userID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING
    },
    postTitle: {
        type: Sequelize.STRING
    },
    postContent: {
        type: Sequelize.TEXT
    },
    postImage: {
        type: Sequelize.STRING
    },
    postLikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = Review;