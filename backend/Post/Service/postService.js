const { Sequelize } = require("sequelize-cockroachdb");
const Post = require("../Models/postTable");
const ModeratorService = require("../../Moderator/Service/moderatorService");
const NotificationService = require("../../Notification/Service/notificationService");
const EmailTemplates = require("../../Notification/emailTemplates");
const UserService = require("../../User/Service/userService");

const sequelize = new Sequelize(process.env.DATABASE_URL);

class PostService {
    static async getAllPostsInPostTable(){
        try {
            const result = await sequelize.transaction(async (t) => {
                const posts = await Post.findAll({}, { transaction: t });

                return posts;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async increasePostLikes(postID, totalLikes){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Post.findByPk(postID,{ transaction: t });

               if(post === null){
                    throw new Error("The post you are tring to get does not exist.");
                }
                // console.log(post);
                const data = post.dataValues;
                // console.log(data);
                const res = await Post.upsert({
                    postID: postID,
                    userID: data.userID,
                    username: data.username,
                    postTitle: data.postTitle,
                    postContent: data.postContent,
                    postImage: data.postImage,
                    postLikes: totalLikes
                },{ transaction: t});

                // send post like notification
                const [r, user] = await UserService.getUserDetailsByUserID(post.userID);

                // send post deleted success notification
                // Get userID from post
                const message = EmailTemplates.generatePostLikeTemplate({
                    to: user.emailID, 
                    username: post.username, 
                    postName: post.postTitle,
                    postLikes: totalLikes
                });
                const notification = await NotificationService.sendNotificationEmail(message);

                return res;
            });
            
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getPostByPostID(postID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Post.findByPk(postID,{ transaction: t });

               if(post === null){
                    throw new Error("The post you are tring to get does not exist.");
                }

                return post;
            });
            
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async updatePost(postID, data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Post.findByPk(postID,{ transaction: t });

                if(post === null){
                    throw new Error("The post you are tring to update does not exist.");
                }
                // console.log(data);
                // 1. create an entry in moderation table
                const res = await ModeratorService.createPostInModerationTable({...data, postID: postID, postLikes: post.postLikes});
                // console.log(res);
                if(res[0] === false){
                    throw new Error(res[1]);
                }
                // 2. delete the entry from post table
                await Post.destroy({
                    where: {
                        postID: postID
                    }
                },{ transaction: t });

                // Send updated post notification in moderate service

                return post;
            });
            if(result === false){
                return [false, "The post you are trying to update doesn't exist."];
            }
            return [true, []];
        } catch (error) {
           return [false, error.message];
        }
    }

    static async deletePost(postID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Post.findByPk(postID, { transaction: t });

                if(post === null){
                    throw new Error("The post you are tring to delete does not exist.");
                }

                await Post.destroy({
                    where: {
                        postID: postID
                    }
                },{ transaction: t });

                // send post deleted success notification
                // get userID from post 
                const [r, user] = await UserService.getUserDetailsByUserID(post.userID);

                // send post deleted success notification
                // Get userID from post
                const message = EmailTemplates.generatePostDeletedTemplate({
                    to:user.emailID, 
                    username: post.username, 
                    postName: post.postTitle
                });
                const notification = await NotificationService.sendNotificationEmail(message);

                return post;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }
}

module.exports = PostService;