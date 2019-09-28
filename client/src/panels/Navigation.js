import React from "react";
import { platform, IOS } from "@vkontakte/vkui";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import Icon28Search from "@vkontakte/icons/dist/28/search";
import Icon28Newsfeed from "@vkontakte/icons/dist/28/newsfeed";
import Icon28More from "@vkontakte/icons/dist/28/more";
import { Link } from "react-router-dom";
import Icon28FavoriteOutline from "@vkontakte/icons/dist/28/favorite_outline";
class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appId: 7150594,
      activeStory: "",
      fetchedUser: null,
      token: null,
      tokenScope: null,
      groups: null,
      group: null,
      showEpic: true
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }

  render() {
    return (
      <div
        style={{
          position: "fixed",
          display: "flex",
          bottom: "0",
          left: "0",
          backgroundColor: "red",
          width: "100%",
          zIndex: "100"
        }}
      >
        <Tabbar>
          <Link
            to="/feed"
            style={{
              textDecoration: "none",
              width: "25%",
              marginTop: "3px"
            }}
          >
            <TabbarItem
              onClick={this.onStoryChange}
              selected={this.state.activeStory === "feed"}
              data-story="feed"
              text="Новости"
            >
              <Icon28Newsfeed />
            </TabbarItem>
          </Link>
          <Link
            to="/discover"
            style={{
              textDecoration: "none",
              width: "25%",
                marginTop: "3px"
            }}
          >
            <TabbarItem
              onClick={this.onStoryChange}
              selected={this.state.activeStory === "discover"}
              data-story="discover"
              text="Поиск"
            >
              <Icon28Search />
            </TabbarItem>
          </Link>
          <Link
            to="/favorites"
            style={{
              textDecoration: "none",
              width: "25%",
                marginTop: "3px"
            }}
          >
            <TabbarItem
              onClick={this.onStoryChange}
              selected={this.state.activeStory === "favorites"}
              data-story="favorites"
              text="Избранное"
            >
              <Icon28FavoriteOutline />
            </TabbarItem>
          </Link>
          <Link
            to="/more"
            style={{
              textDecoration: "none",
              width: "25%",
                marginTop: "3px"
            }}
          >
            <TabbarItem
              onClick={this.onStoryChange}
              selected={this.state.activeStory === "more"}
              data-story="more"
              text="Ещё"
            >
              <Icon28More />
            </TabbarItem>
          </Link>
        </Tabbar>
      </div>
    );
  }
}
export default Navigation;
