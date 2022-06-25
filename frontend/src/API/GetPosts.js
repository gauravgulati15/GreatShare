const API_ENDPOINT = "";
const GetPosts = async (userId) => {
  let response = await fetch(API_ENDPOINT);
  let Posts = await response.json();
  return Posts;
};
export default GetPosts;
