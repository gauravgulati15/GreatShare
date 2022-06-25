const cron = require("node-cron");
const ImageModerator = require("./imageModerator");
const TextModerator = require("./textModerator");
const ModeratorService = require("./Service/moderatorService");

const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0RJtNq0Iwr1v_IylEYzJzgSnA-K-7yWXw9w&usqp=CAU ";

let isCronLocked = false;

const moderatorTask = cron.schedule("2 * * * * *",async ()=>{
    if(isCronLocked===true){
        return;
    }
    isCronLocked = true;
    // setTimeout(()=>{
    //     console.log("Cron working with isCronLocked ->" + isCronLocked);
    // }, 5000)
    // await timeout(5000);
    console.log("Cron working with isCronLocked ->" + isCronLocked);
    const r = await moderatorCheck();
    isCronLocked = false;
});

function timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moderatorCheck(){
    //1. get the posts from moderation table
    const [res, posts] = await ModeratorService.getLimitedOldestPost();

    if(posts.length === 0) {
        console.log("Moderator Table Empty");
        return;
    }
    console.log(posts); 

    //2. check for moderation for each post
    posts.forEach(async (p)=>{
        const imageCheck = await ImageModerator.imageModerator(url); // change url with p.postImage
        const textCheck = await TextModerator.textModerator(p.postContent);

        // Passed moderation
        if(imageCheck === false && textCheck === false){
            const r = await ModeratorService.transferPostFromModeratorToPostTable(p.postID);
        } else {
            const r = await ModeratorService.transferPostFromModeratorToReviewTable(p.postID);
        }
    });

    return;
}

module.exports = moderatorTask;