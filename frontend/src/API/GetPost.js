import posts from "../Testing/posts";
const API_ENDPOINT = "";
const GetPost = (postId) => {
  for (let index = 0; index < posts.length; index++) {
    const element = posts[index];
    if (element.id === postId) return element;
  }
};

//const API_ENDPOINT = "";
export default GetPost;
