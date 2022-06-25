const CommentsService = require("../Service/commentsService");

class CommentsController {
    static async getComments(req, res, next){
        const [flag, resp] = await CommentsService.getComments();
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async createComment(req, res, next){
        const [flag, resp] = await CommentsService.createComment(req.body);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(true);
    }

    static async getCommentByPostID(req, res, next){
        const [flag, resp] = await CommentsService.getCommentByPostID(req.params.postID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async deleteComment(req, res, next){
        const [flag, resp] = await CommentsService.deleteComment(req.params.commentID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(true);
    }

    static async updateComment(req, res, next){
        const [flag, resp] = await CommentsService.updateComment(req.params.commentID, req.body);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(true);
    }
}

module.exports = CommentsController;