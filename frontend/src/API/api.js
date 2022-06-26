const http = require("../http-common");

class GreatShareService {
    // USER MODULE
    // 1. Get user details by emailID
    static async getUserDetailsByEmailID(emailID){
        try{
            const res = await http.get(`/user/userDetailsByEmailID/${emailID}`);

            if(res.status !== 200){
                throw new Error(res.data);
            }
            return [true, res.data];
        } catch(error){
            return [false, error.message];
        }
    }

    // 2. Get user details by userID
    static async getUserDetailsByUserID(userID){
        try{
            const res = await http.get(`/user/${userID}`);            
            if(res.status !== 200){
                throw new Error(res.data);
            }
            return [true, res.data];
        } catch(error){
            // console.log(error);
            return [false, "The user does not exist"];
        }
    }

    // 3. Create new user
    static async authUser(data){
        const json = JSON.stringify({
            emailID: data.emailID,
            password: data.password
        });
        try {
            const res = await http.get("/user/authUser", json);
            if(res.status !== 200){
                throw new Error(res.data);
            }
            return [true, res.data];
        } catch(error){
            return [false, error.message];
        }
    }

    static async createNewUser(data){
        const json = JSON.stringify({
            username: data.username,
            emailID: data.emailID,
            phoneNo: data.phoneNo,
            password: data.password
        });
       try {
                const res = await http.post("/user/", json);
                if(res.status !== 200){
                    throw new Error(res.data);
                }
                return [true, res.data];
        } catch(error){
            return [false, error.message];
        }
    }

    // 4. update user
    static async updateUser(userID, data){
        const json = JSON.stringify({
                    username: data.username,
                    emailID: data.emailID,
                    phoneNo: data.phoneNo,
                    password: data.password
            });
        try{
            const res = await http.post(`/user/${userID}`, json);
            if(res.status !== 200){
                throw new Error(res.data);
            }
            return [true, res.data];
        } catch(error){
            return [false, error.message];
        }
    }

    // 5. delete user
    static async deleteUser(userID){
        try{
            const res = await http.delete(`/user/${userID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch(error){
            return [false, error.message];
        }
    }

    // VERIFY MODULE
    static async sendPhoneCode(phoneNo){
        const json = JSON.stringify({
            phoneNo: phoneNo
        });
        try{
            const res = await http.put("/verify/sendPhoneCode", json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async verifyPhoneCode(phoneNo, code){
        const json = JSON.stringify({
            phoneNo: phoneNo,
            code: code
        });
        try{
            const res = await http.put("/verify/verifyPhoneCode", json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async sendEmailCode(emailID){
        const json = JSON.stringify({
            emailID: emailID
        });
        try{
            const res = await http.put("/verify/sendEmailCode", json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async verifyEmailCode(emailID, code){
        const json = JSON.stringify({
            emailID: emailID,
            code: code
        });
        try{
            const res = await http.put("/verify/verifyEmailCode", json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    // MODERATION MODULE
    static async getUserPostInModerationTable(userID){
        try{
            const res = await http.get(`/moderator/getAllPostsByUserID/${userID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async createPost(data){
        const json = JSON.stringify({
            userID: data.userID,
            username: data.username,
            postTitle: data.postTitle,
            postContent: data.postContent,
            postImage: data.postImage
        });
        try{
            const res = await http.post("/moderator", json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    // POST MODULE
    static async getPostByPostID(postID){
        try{
            const res = await http.get(`/posts/${postID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async updatePostInPostTable(postID, data){
        const json = JSON.stringify({
            userID: data.userID,
            username: data.username,
            postTitle: data.postTitle,
            postContent: data.postContent,
            postImage: data.postImage,
            postLikes: data.postLikes
        });
        try{
            const res = await http.put(`/posts/${postID}`, json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async deletePostInPostTable(postID){
        try{
            const res = await http.delete(`/posts/${postID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async increaseLikesOfAPost(postID, postLikes){
        const json = JSON.stringify({
            totalLikes: postLikes
        });
        try{
            const res = await http.put(`/posts/increaseLikes/${postID}`, json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async getUserPostInPostTable(userID){
        try{
            const res = await http.get(`/posts/getAllPostsByUserID/${userID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async getAllPostsFromPostInPostTable(){
        try{
            const res = await http.get("/posts/all");
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    // REVIEW TABLE
    static async getPostInReviewTable(postID){
        try{
            const res = await http.get(`/review/${postID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async updatePostInReviewTable(postID, data){
        const json = JSON.stringify({
            userID: data.userID,
            username: data.username,
            postTitle: data.postTitle,
            postContent: data.postContent,
            postImage: data.postImage,
            postLikes: data.postLikes
        });
        try{
            const res = await http.put(`/review/${postID}`, json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async deletePostInReviewTable(postID){
        try{
            const res = await http.delete(`/review/${postID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async getUserPostInReviewTable(userID){
        try{
            const res = await http.get(`/review/getAllPostsByUserID/${userID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    // COMMENTS MODULE
    static async getAllCommentsOfAPost(postID){
        try{
            const res = await http.get(`/comments/${postID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async createCommentsOfAPost(data){
        const json = JSON.stringify({
            postID: data.postID,
            userID: data.userID, // the person who made the comment
            username: data.username, // the person who made the comment
            commentText: data.commentText
        });
        try{
            const res = await http.post(`/comments`, json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async deleteComment(commentID){
        try{
            const res = await http.delete(`/comments/${commentID}`);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }

    static async updateComment(commentID, data){
        const json = JSON.stringify({
            postID: data.postID,
            userID: data.userID, // the person who made the comment
            username: data.username, // the person who made the comment
            commentText: data.commentText
        });
        try{
            const res = await http.put(`/comments/${commentID}`, json);
            if(res.status !== 200){
                    throw new Error(res.data);
            }
            return [true, res.data];
        } catch (error){
            return [false, error.message];
        }
    }
}


// testing
// async function getRes(){
//     const res = await GreatShareService.authUser({
//         emailID: "harshanand.jha@gmail.com",
//         password: "harshanandjha"
//     });
//     console.log(res);
// }

// getRes();

module.exports = GreatShareService;
