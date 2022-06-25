const ReviewService = require("../Service/reviewService");

class ReviewController {
    static async getAllPostsInReviewTable(req, res, next){
        const [flag, resp] = await ReviewService.getAllPostsInReviewTable();
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async getPostByPostIDFromReviewTable(req, res, next){
        const [flag, resp] = await ReviewService.getPostByPostIDFromReviewTable(req.params.postID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async updatePostOfReviewTable(req, res, next){
        const [flag, resp] = await ReviewService.updatePostOfReviewTable(req.params.postID, req.body);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async deletePost(req, res, next){
        const [flag, resp] = await ReviewService.deletePost(req.params.postID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }
}

module.exports = ReviewController;