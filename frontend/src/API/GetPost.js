const API_ENDPOINT = "";
const GetPost = async (postId) => {
  let response = await fetch(API_ENDPOINT);
  let Post = await response.json();
  return Post;
};

//const API_ENDPOINT = "";
export default GetPost;
