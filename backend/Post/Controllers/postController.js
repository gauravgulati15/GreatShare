const PostService = require("../Service/postService");

class PostController {
    static async getAllPostsInPostTable(req, res, next){
        const [flag, resp] = await PostService.getAllPostsInPostTable();
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async getAllPostsByUserIDFromPostTable(req, res, next){
        const [flag, resp] = await PostService.getAllPostsByUserIDFromPostTable(req.params.userID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async increasePostLikes(req, res, next){
        const [flag, resp] = await PostService.increasePostLikes(req.params.postID, req.body.totalLikes);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(true);
    }

    static async getPostByPostID(req, res, next){
        const [flag, resp] = await PostService.getPostByPostID(req.params.postID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async updatePost(req, res, next){
        const [flag, resp] = await PostService.updatePost(req.params.postID, req.body);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }

    static async deletePost(req, res, next){
        const [flag, resp] = await PostService.deletePost(req.params.postID);
        if(flag === false){
            res.status(500).send(resp);
        }
        res.send(resp);
    }
}

module.exports = PostController;