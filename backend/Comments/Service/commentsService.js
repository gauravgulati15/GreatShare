const { Sequelize } = require("sequelize-cockroachdb");
const Comments = require("../Models/commentsTable");
const NotificationService = require("../../Notification/Service/notificationService");
const EmailTemplates = require("../../Notification/emailTemplates");
const UserService = require("../../User/Service/userService");
const PostService = require("../../Post/Service/postService");

const sequelize = new Sequelize(process.env.DATABASE_URL);

class CommentsService {
    static async createComment(data){
        // console.log(data);
        // creating a managed transaction
        // for reference -> https://sequelize.org/docs/v6/other-topics/transactions/
        try {
            const result = await sequelize.transaction(async (t) => {
                const comment = await Comments.create({
                    postID : data.postID,
                    userID : data.userID,
                    username: data.username,
                    commentText: data.commentText
                }, { transaction: t});

                // Comment added success notification
                const [r, postDetails] = await PostService.getPostByPostID(data.postID);
                const [p, postUserDetails] = await UserService.getUserDetailsByUserID(postDetails.userID);
                const message = await EmailTemplates.generateCommentOnPostTemplate({
                    to: postUserDetails.emailID,
                    username: postDetails.username,
                    postName: postDetails.postTitle,
                    commentName: data.username
                })
                const notification = await NotificationService.sendNotificationEmail(message);

                return comment;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getComments(){
        try {
            const result = await sequelize.transaction(async (t) => {
                const comment = await Comments.findAll({}, { transaction: t });

                return comment;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async deleteComment(commentID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const comment = await Comments.destroy({
                    where: {
                        commentID: commentID
                    }
                }, { transaction: t });

                return comment;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async getCommentByPostID(postID){
        try {
            const result = await sequelize.transaction(async (t) => {
                const comment = await Comments.findAll({
                    where: {
                        postID: postID
                    }
                }, { transaction: t });

                return comment;
            });
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }

    static async updateComment(commentID, data){
        try {
            const result = await sequelize.transaction(async (t) => {
                const findComment = await Comments.findByPk(commentID, { transaction: t });

                if(findComment === null){
                    throw new Error("The comment you are tring to update does not exist.");
                }

                const comment = await Comments.upsert({
                    commentID: commentID,
                    postID : data.postID,
                    userID : data.userID,
                    username: data.username,
                    commentText: data.commentText
                }, { transaction: t });

                return comment;
            });
            
            return [true, result];
        } catch (error) {
            return [false, error.message];
        }
    }
}

module.exports = CommentsService;