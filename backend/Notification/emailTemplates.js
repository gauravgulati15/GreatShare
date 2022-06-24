class EmailTemplates {
    static generateUserAddedTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-29a44c33d1e94d1d966b370af991b4f6",
            dynamic_template_data: {
                username: data.username
            }
        }

        return msg;
    }

    static generateUserUpdatedTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-f49357ecbc31425db1fe53a06a8618b4",
            dynamic_template_data: {
                username: data.username
            }
        }

        return msg;
    }

    static generatePostDeletedTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-b14eed16cd9c4aacbbd82877923f5cff",
            dynamic_template_data: {
                username: data.username,
                postName: data.postName
            }
        }

        return msg;
    }

    static generatePostLikeTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-cdf64ebb9d9c4211a0f077e6fb54bb79",
            dynamic_template_data: {
                username: data.username,
                postName: data.postName,
                postLikes: data.postLikes
            }
        }

        return msg;
    }

    static generatePostCreatedTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-f6f419a0da9f40bb935a09a24f00f2f5",
            dynamic_template_data: {
                username: data.username,
                postName: data.postName
            }
        }

        return msg;
    }

    static generatePostPassedModerationCheckTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-75fca32bcc3541649549f3e4ad691742",
            dynamic_template_data: {
                username: data.username,
                postName: data.postName
            }
        }

        return msg;
    }

    static generatePostFailedModerationCheckTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-f443c5b95f704a4bbf58a745e992fc11",
            dynamic_template_data: {
                username: data.username,
                postName: data.postName
            }
        }

        return msg;
    }

    static generateCommentOnPostTemplate(data){
        const msg = {
            to: data.to, 
            from: 'espadas1505@engineer.com',
            template_id: "d-a5622a0c3ac9408e84a84ad34647a0f2",
            dynamic_template_data: {
                username: data.username,
                postName: data.postName,
                commentName: data.commentName
            }
        }

        return msg;
    }
}

module.exports = EmailTemplates;

// console.log(EmailTemplates.commentOnPostTemplate({to:"sdsd",username:"sdsdsd",postName: "dsdsdsd", commentName: "gaurav"}));