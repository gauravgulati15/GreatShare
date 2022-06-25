const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require("sequelize-cockroachdb");
const Moderator = require("../Models/moderatorTable");
const CreatePost = require("../../Post/Service/createPost");
const CreatePostInReviewTable = require("../../Review/Service/createPost");
const NotificationService = require("../../Notification/Service/notificationService");
const EmailTemplates = require("../../Notification/emailTemplates");
const UserService = require("../../User/Service/userService");

const sequelize = new Sequelize(process.env.DATABASE_URL);

class ModeratorService {
    static async createPostInModerationTable(data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Moderator.create({
                    postID: data.postID ?? uuidv4(),
                    userID: data.userID,
                    username: data.username,
                    postTitle: data.postTitle,
                    postContent: data.postContent,
                    postImage: data.postImage,
                    postLikes: data.postLikes ?? 0
                }, { transaction: t});

                // Send post created success and awaiting Moderation check notifcation
                // get userID from data
                const [r, userDetails] = await UserService.getUserDetailsByUserID(data.userID);
                // console.log(userDetails);
                const message = EmailTemplates.generatePostCreatedTemplate({
                    to: userDetails.emailID,
                    username: data.username,
                    postName: data.postTitle
                })
                const notification = await NotificationService.sendNotificationEmail(message);

                return post;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getAllPostsInModerationTable(){
        try {
            const result = await sequelize.transaction(async (t) => {
                const posts = await Moderator.findAll({}, { transaction: t });

                return posts;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getLimitedOldestPost(){
        try {
            const result = await sequelize.transaction(async (t) => {
                const posts = await Moderator.findAll({
                    limit: 2,
                    order: [['createdAt', 'ASC']],
                    raw: true,
                    nest: true
                }, { transaction: t });

                return posts;
            });
            return [true, result];
        } catch (error) {
           return [false, error.message];
        }
    }

    static async transferPostFromModeratorToPostTable(postID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Moderator.findByPk(postID,{ transaction: t });

                if(post === null){
                    throw new Error("The post you are tring to transfer does not exist.");
                }
                
                // 1. create an entry in post table
                const res = await CreatePost.createPost(post);
                if(res[0] === false){
                    throw new Error(res[1]);
                }

                // 2. delete the entry from post table
                const r = await Moderator.destroy({
                    where: {
                        postID: postID
                    }
                },{ transaction: t });
                
                // Send post passed moderation notification
                // get userID from post
                const [u, userDetails] = await UserService.getUserDetailsByUserID(post.userID);
                const message = EmailTemplates.generatePostPassedModerationCheckTemplate({
                    to: userDetails.emailID,
                    username: post.username,
                    postName: post.postTitle
                })
                const notification = await NotificationService.sendNotificationEmail(message);

                return post;
            });
            
            return [true, true];
        } catch (error) {
           return [false, error.message];
        }
    }

    static async transferPostFromModeratorToReviewTable(postID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Moderator.findByPk(postID,{ transaction: t });

                if(post === null){
                    throw new Error("The post you are tring to transfer does not exist.");
                }
                
                // 1. create an entry in review table
                const res = await CreatePostInReviewTable.createPost(post);
                if(res[0] === false){
                    throw new Error(res[1]);
                }

                // 2. delete the entry from post table
                const r = await Moderator.destroy({
                    where: {
                        postID: postID
                    }
                },{ transaction: t });
                
                // Send post created does not pass moderation check notifcation
                // get userID from post
                const [u, userDetails] = await UserService.getUserDetailsByUserID(post.userID);
                const message = EmailTemplates.generatePostFailedModerationCheckTemplate({
                    to: userDetails.emailID,
                    username: post.username,
                    postName: post.postTitle
                })
                const notification = await NotificationService.sendNotificationEmail(message);

                return post;
            });
            
            return [true, true];
        } catch (error) {
           return [false, error.message];
        }
    }
}

module.exports = ModeratorService;