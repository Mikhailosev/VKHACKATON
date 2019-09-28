import React from "react";
import connect from "@vkontakte/vk-connect";
import { View, Epic, Tabbar, TabbarItem, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Icon28FavoriteOutline from "@vkontakte/icons/dist/28/favorite_outline";
import Icon28More from "@vkontakte/icons/dist/28/more";
import Icon28Newsfeed from "@vkontakte/icons/dist/28/newsfeed";
import Icon28Search from "@vkontakte/icons/dist/28/search";
import { withRouter, Link, Route } from "react-router-dom";
import Feed from "./panels/Feed.js";
import Favorites from "./panels/Favorites.js";
import Discover from "./panels/Discover.js";
import More from "./panels/More.js";
import PostBuy from "./panels/PostBuy.js";
import FullPost from "./panels/FullPost.js";
import GroupView from "./panels/GroupView";
import GroupForm from "./panels/GroupForm";
import Navigation from "./panels/Navigation.js";

class App extends React.Component {
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

  componentDidMount() {
    console.log(this.props);
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
    this.setState({ token: token.access_token });
    this.setState({ tokenScope: token.scope });

    const groups = await connect.sendPromise("VKWebAppCallAPIMethod", {
      method: "groups.get",
      request_id: "getGroups",
      params: {
        filter: ["admin", "editor", "moder"],
        user_id: this.state.fetchedUser.id,
        extended: "1",
        v: "5.101",
        fields: "description",
        count: "999",
        access_token: this.state.token
      }
    });
    this.setState({ groups: groups.response });
    console.log(this.state);
  }
  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }

  render() {
    return (
      <div>
        {this.state.fetchedUser ? (
          <Navigation style={{ zIndex: "1000" }}></Navigation>
        ) : null}

        <Route
          path="/favorites"
          render={props => <Favorites go={this.onStoryChange} id="favorites" />}
        />
        <Route
          path="/post/:postId"
          exact
          render={props => {
            return <FullPost {...props} />;
          }}
        />
        <Route
          path="/discover"
          render={props => (
            <View id="discover" activePanel="discover">
              <Discover go={this.onStoryChange} id="discover" />
            </View>
          )}
        />
        <Route
          path="/feed"
          render={props => (
            <View id="feed" activePanel="feed">
              <Feed id="feed" go={this.onStoryChange} />
            </View>
          )}
        />
        <Route
          path="/more"
          render={props => (
            <View id="more" activePanel="more">
              <More id="more" groups={this.state.groups} />
            </View>
          )}
        />
        <Route
          path="/group/:groupId"
          render={props => (
            <View id="group" activePanel="group">
              <GroupView id="group" />
            </View>
          )}
        />
        <Route
          path="/register/"
          render={props => (
            <View id="group" activePanel="group">
              <GroupForm groups={this.state.groups} id="group" />
            </View>
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
