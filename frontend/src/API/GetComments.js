const API_ENDPOINT = "";
const GetComments = async (postId) => {
  let res = await fetch(API_ENDPOINT);
  let Comments = await res.json();
  return Comments;
};

export default GetComments;
