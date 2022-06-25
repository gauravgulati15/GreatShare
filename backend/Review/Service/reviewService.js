const { Sequelize } = require("sequelize-cockroachdb");
const Review = require("../Models/reviewTable");
const ModeratorService = require("../../Moderator/Service/moderatorService");
const NotificationService = require("../../Notification/Service/notificationService");
const EmailTemplates = require("../../Notification/emailTemplates");
const UserService = require("../../User/Service/userService");

const sequelize = new Sequelize(process.env.DATABASE_URL);

class ReviewService {
    static async getAllPostsInReviewTable(){
        try {
            const result = await sequelize.transaction(async (t) => {
                const posts = await Review.findAll({}, { transaction: t });

                return posts;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getPostByPostIDFromReviewTable(postID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Review.findByPk(postID,{ transaction: t });

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

    static async updatePostOfReviewTable(postID, data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Review.findByPk(postID,{ transaction: t });

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
                // 2. delete the entry from review table
                await Review.destroy({
                    where: {
                        postID: postID
                    }
                },{ transaction: t });

                // Send updated post notification in moderate service

                return post;
            });
            
            return [true, []];
        } catch (error) {
           return [false, error.message];
        }
    }

    static async deletePost(postID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const post = await Review.findByPk(postID, { transaction: t });
                
                if(post === null){
                    throw new Error("The post you are tring to delete does not exist.");
                }

                await Review.destroy({
                    where: {
                        postID: postID
                    }
                },{ transaction: t });

                const [res, user] = await UserService.getUserDetailsByUserID(post.userID);

                // send post deleted success notification
                // Get userID from post
                const message = EmailTemplates.generatePostDeletedTemplate({
                    to:user.emailID, 
                    username: post.username, 
                    postName: post.postTitle
                });
                const notification = await NotificationService.sendNotificationEmail(message);

                return true;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }
}

module.exports = ReviewService;