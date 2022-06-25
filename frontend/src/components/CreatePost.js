import React, { useState } from "react";
import CreateForm from "../styled-components/CreateForm";
import FileBase from "react-file-base64";
const CreatePost = () => {
  const [postData, setPostData] = useState({
    postTitle: "",
    postContent: "",
    postImage: "",
  });
  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(postData);
    setPostData({
      postTitle: "",
      postContent: "",
      postImage: "",
    });
  };
  return (
    <CreateForm onSubmit={HandleSubmit}>
      <h3>Create a post</h3>
      <div className="inputBox">
        <input
          type="text"
          onChange={(e) => {
            setPostData({ ...postData, postTitle: e.target.value });
          }}
          name="title"
          id="title"
          required="required"
        />
        <span>Title for your post</span>
      </div>
      <div className="inputBox">
        <input
          type="text"
          onChange={(e) => {
            setPostData({ ...postData, postContent: e.target.value });
          }}
          name="content"
          id="content"
          required="required"
        />
        <span>Write something about your post </span>
      </div>
      <div className="inputBox">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, postImage: base64 })
          }
        />
      </div>
      <input type="submit" value="Create" />
    </CreateForm>
  );
};

export default CreatePost;
