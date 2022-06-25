const { Sequelize } = require("sequelize-cockroachdb");
const Post = require("../Models/postTable");

const sequelize = new Sequelize(process.env.DATABASE_URL);

class CreatePost{
    static async createPost(data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Post.create({
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

module.exports = CreatePost;