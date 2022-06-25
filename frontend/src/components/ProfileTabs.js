import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import posts from "../Testing/posts";
import PostGrid from "./PostGrid";
import "react-tabs/style/react-tabs.css";

const ProfileTabs = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Posts</Tab>
        <Tab>In queue for moderation</Tab>
        <Tab>Need change</Tab>
      </TabList>

      <TabPanel>
        <PostGrid inActive={false} posts={posts} />
      </TabPanel>
      <TabPanel>
        <PostGrid inActive={true} posts={posts} />
      </TabPanel>
      <TabPanel>
        <PostGrid inActive={false} posts={posts} />
      </TabPanel>
    </Tabs>
  );
};

export default ProfileTabs;
