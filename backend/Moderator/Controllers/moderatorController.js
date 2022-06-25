const ModeratorService = require("../Service/moderatorService");

class ModeratorController {
    static async getAllPostsInModerationTable(req, res, next){
        const [flag, resp] = await ModeratorService.getAllPostsInModerationTable();
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async getAllPostsByUserIDFromModeratorTable(req, res, next){
        const [flag, resp] = await ModeratorService.getAllPostsByUserIDFromModeratorTable(req.params.userID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async createPost(req, res, next){
        const [flag, resp] = await ModeratorService.createPostInModerationTable(req.body);
        if(flag === false){
            res.status(400).send(resp);
        }
        res.send(true);
    }

    static async getLimitedOldestPost(req, res, next){
        const [flag, resp] = await ModeratorService.getLimitedOldestPost(req.params.userID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async transferPostFromModeratorToPostTable(req, res, next){
        const [flag, resp] = await ModeratorService.transferPostFromModeratorToPostTable(req.body.postID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async transferPostFromModeratorToReviewTable(req, res, next){
        const [flag, resp] = await ModeratorService.transferPostFromModeratorToReviewTable(req.body.postID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }
}

module.exports = ModeratorController;