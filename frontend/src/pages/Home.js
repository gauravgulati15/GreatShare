import GreatShareService from "../API/api";
import React, {useState, useEffect} from "react";
import PostGrid from "../components/PostGrid";
// import posts from "../Testing/posts";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "../CSS/Home.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    GreatShareService.getAllPostsFromPostInPostTable()
        .then((res)=>{
              setIsLoading(false);
              setPosts(res[1]);
        })
        .catch((error)=>{
          console.log(error);
        });
    console.log(posts);
  },[]);

  return (
    <div style={isLoading ? {height: "100vh"} : {}}>
      <div>
        <h1 className="explore">Explore</h1>
        <Link className="share" to="/create">
          Share A Post
          <PostAddIcon />
        </Link>
      </div>
      {isLoading === true 
          ?
          <div className="loader"></div>
          :
          <PostGrid inActive="0" posts={posts} />
      }
    </div>
  );
};

export default Home;
