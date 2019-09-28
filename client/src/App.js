import React from "react";
import connect from "@vkontakte/vk-connect";
import { View, Epic, Tabbar, TabbarItem } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Icon28FavoriteOutline from "@vkontakte/icons/dist/28/favorite_outline";
import Icon28More from "@vkontakte/icons/dist/28/more";
import Icon28Newsfeed from "@vkontakte/icons/dist/28/newsfeed";
import Icon28Search from "@vkontakte/icons/dist/28/search";

import Feed from "./panels/Feed.js";
import Favorites from "./panels/Favorites.js";
import Discover from "./panels/Discover.js";
import More from "./panels/More.js";
import PostBuy from "./panels/PostBuy.js";
import FullPost from "./panels/FullPost.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appId: 7150594,
      activeStory: "feed",
      fetchedUser: null,
      token: null,
      tokenScope: null,
      groups: null
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  componentDidMount() {
    this.apiRequests();
    console.log(this.state);
  }

  async apiRequests() {
    this.state.fetchedUser = await connect.sendPromise(
      "VKWebAppGetUserInfo",
      {}
    );

    const token = await connect.sendPromise("VKWebAppGetAuthToken", {
      app_id: this.state.appId,
      scope: "groups"
    });
    this.state.token = token.access_token;
    this.state.tokenScope = token.scope;

    const groups = await connect.sendPromise("VKWebAppCallAPIMethod", {
      method: "groups.get",
      request_id: "getGroups",
      params: {
        user_id: this.state.fetchedUser.id,
        extended: "1",
        fields: "description",
        count: "100",
        v: "5.101",
        access_token: this.state.token
      }
    });
    this.state.groups = groups.response;
  }

  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }

  render() {
    return (
      <div>
        {this.state.activeStory !== "fullPost" ? (
          <Epic
            activeStory={this.state.activeStory}
            tabbar={
              <Tabbar>
                <TabbarItem
                  onClick={this.onStoryChange}
                  selected={this.state.activeStory === "feed"}
                  data-story="feed"
                  text="Новости"
                >
                  <Icon28Newsfeed />
                </TabbarItem>
                <TabbarItem
                  onClick={this.onStoryChange}
                  selected={this.state.activeStory === "discover"}
                  data-story="discover"
                  text="Поиск"
                >
                  <Icon28Search />
                </TabbarItem>
                <TabbarItem
                  onClick={this.onStoryChange}
                  selected={this.state.activeStory === "favorites"}
                  data-story="favorites"
                  text="Избранное"
                >
                  <Icon28FavoriteOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={this.onStoryChange}
                  selected={this.state.activeStory === "more"}
                  data-story="more"
                  text="Ещё"
                >
                  <Icon28More />
                </TabbarItem>
              </Tabbar>
            }
          >
            <View id="fullPost" activePanel="fullPost">
              <FullPost go={this.onStoryChange} id="fullPost"></FullPost>
            </View>
            <View id="postbuy" activePanel="postbuy">
              <PostBuy go={this.onStoryChange} id="postbuy"></PostBuy>
            </View>
            <View id="feed" activePanel="feed">
              <Feed id="feed" go={this.onStoryChange} />
            </View>
            <View id="discover" activePanel="discover">
              <Discover id="discover" />
            </View>
            <View id="favorites" activePanel="favorites">
              <Favorites id="favorites" />
            </View>
            <View id="more" activePanel="more">
              <More id="more" groups={this.state.groups} />
            </View>
          </Epic>
        ) : (
          <Epic activeStory={this.state.activeStory}>
            <View id="fullPost" activePanel="fullPost">
              <FullPost go={this.onStoryChange} id="fullPost"></FullPost>
            </View>
            <View id="postbuy" activePanel="postbuy">
              <PostBuy go={this.onStoryChange} id="postbuy"></PostBuy>
            </View>
            <View id="feed" activePanel="feed">
              <Feed id="feed" go={this.onStoryChange} />
            </View>
            <View id="discover" activePanel="discover">
              <Discover id="discover" />
            </View>
            <View id="favorites" activePanel="favorites">
              <Favorites id="favorites" />
            </View>
            <View id="more" activePanel="more">
              <More id="more" groups={this.state.groups} />
            </View>
          </Epic>
        )}
      </div>
    );
  }
}

export default App;
