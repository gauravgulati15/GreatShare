import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import posts from "../Testing/posts";
import PostGrid from "./PostGrid";
import "react-tabs/style/react-tabs.css";

const ProfileTabs = ({posts, reviewPosts, moderatePosts}) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Posts</Tab>
        <Tab>In queue for moderation check</Tab>
        <Tab>Needs change</Tab>
      </TabList>

      <TabPanel>
        <PostGrid inActive="0" posts={posts} />
      </TabPanel>
      <TabPanel>
        <PostGrid inActive="1" posts={moderatePosts} />
      </TabPanel>
      <TabPanel>
        <PostGrid inActive="2" posts={reviewPosts} />
      </TabPanel>
    </Tabs>
  );
};

export default ProfileTabs;
