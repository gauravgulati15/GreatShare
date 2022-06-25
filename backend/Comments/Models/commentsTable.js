const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Comments = sequelize.define("comments",{
    commentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postID: {
        type: Sequelize.STRING,
    },
    userID: {
        type: Sequelize.INTEGER,
    },
    username: {
        type: Sequelize.STRING,
    },
    commentText: {
        type: Sequelize.TEXT,
    }
});

module.exports = Comments;