const { Sequelize } = require("sequelize-cockroachdb");
const Review = require("../Models/reviewTable");

const sequelize = new Sequelize(process.env.DATABASE_URL);

class CreatePostInReviewTable{
    static async createPost(data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Review.create({
                    postID: data.postID,
                    userID: data.userID,
                    username: data.username,
                    postTitle: data.postTitle,
                    postContent: data.postContent,
                    postImage: data.postImage,
                    postLikes: data.postLikes ?? 0
                }, { transaction: t});

                return post;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }
}

module.exports = CreatePostInReviewTable;