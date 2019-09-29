import React from "react";
import connect from "@vkontakte/vk-connect";
import {
  View,
  Epic,
  Tabbar,
  TabbarItem,
  Group,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  IS_PLATFORM_ANDROID,
  HeaderButton,
  IS_PLATFORM_IOS,
  FormLayoutGroup,
  Button
} from "@vkontakte/vkui";
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

import VKStories from "vk-stories";
import VKConnect from "@vkontakte/vkui-connect-promise";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appId: 7150594,
      activeStory: "feed",
      fetchedUser: null,
      token: null,
      tokenScope: null,
      groups: null,
      group: null,
      showEpic: true,
      activeModal: null
    };
    this.onStoryChange = this.onStoryChange.bind(this);
    this.modalBack = () => {
      this.toggleModal();
    };
    this.handlePayButtonClick = this.handlePayButtonClick.bind(this);
    this.postToWall = this.postToWall.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.apiRequests();
    console.log(this.state);
  }

  async apiRequests() {
    const user = await VKConnect.send("VKWebAppGetUserInfo", {}).catch(() =>
      console.log("Cannot get User information")
    );
    this.setState({ fetchedUser: user.data });

    const token = await VKConnect.send("VKWebAppGetAuthToken", {
      app_id: this.state.appId,
      scope: "groups,stories,wall"
    }).catch(() => console.log("Cannot get Authorization Token"));
    this.setState({
      token: token.data.access_token,
      tokenScope: token.data.scope
    });

    const groups = await VKConnect.send("VKWebAppCallAPIMethod", {
      method: "groups.get",
      request_id: "getGroups",
      params: {
        filter: "admin,editor,moder",
        user_id: this.state.fetchedUser.id,
        extended: "1",
        fields: "description",
        count: "999",
        v: "5.101",
        access_token: this.state.token
      }
    }).catch(() => console.log("Cannot get groups"));
    this.setState({ groups: groups.data });
  }

  // async apiRequests() {
  //   this.state.fetchedUser = await connect.sendPromise(
  //     "VKWebAppGetUserInfo",
  //     {}
  //   );
  //
  //   const token = await connect.sendPromise("VKWebAppGetAuthToken", {
  //     app_id: this.state.appId,
  //     scope: "groups"
  //   });
  //   this.setState({ token: token.access_token });
  //   this.setState({ tokenScope: token.scope });
  //
  //   const groups = await connect.sendPromise("VKWebAppCallAPIMethod", {
  //     method: "groups.get",
  //     request_id: "getGroups",
  //     params: {
  //       filter: ["admin", "editor", "moder"],
  //       user_id: this.state.fetchedUser.id,
  //       extended: "1",
  //       v: "5.101",
  //       fields: "description",
  //       count: "999",
  //       access_token: this.state.token
  //     }
  //   });
  //   this.setState({ groups: groups.response });
  //   console.log(this.state);
  // }
  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }

  toggleModal() {
    this.state.activeModal
      ? this.setState({ activeModal: null })
      : this.setState({ activeModal: "share" });
  }

  getModalContent() {
    return (
      <ModalRoot activeModal={this.state.activeModal}>
        <ModalPage
          id="share"
          header={
            <ModalPageHeader
              left={
                IS_PLATFORM_ANDROID && (
                  <HeaderButton onClick={this.modalBack}>
                    <Icon24Cancel />
                  </HeaderButton>
                )
              }
              right={
                IS_PLATFORM_IOS && (
                  <HeaderButton onClick={this.modalBack}>
                    <Icon24Dismiss />
                  </HeaderButton>
                )
              }
            >
              Поделиться
            </ModalPageHeader>
          }
          onClose={this.modalBack}
          settlingHeight={80}
        >
          <FormLayout>
            <FormLayoutGroup>
              <Button
                level="secondary"
                onClick={() => this.postToWall()}
                size="xl"
              >
                Опубликовать на стене
              </Button>
              <Button
                level="secondary"
                onClick={() => this.addToStory()}
                size="xl"
              >
                Добавить в историю
              </Button>
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    );
  }

  postToWall(message) {
     const token = this.state.token;
    VKConnect.send("VKWebAppShowWallPostBox", {
        access_token: token,
      message: message,
      v: "5.101"
    })
      .then(response => console.log(response))
      .catch(() => alert("Что-то полшо не так, попробуйте еще раз :-("));
  }

  addToStory(image, text) {
    const VK_API_VERSION = "5.95";
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    const fields = [
      {
        x: 540,
        y: 1133,
        value: "Hello World",
        font: "96px Arial",
        align: "center",
        color: "#FFFFFF"
      }
    ];

    const __makeFakeFile = (dataUrl, filename) => {
      let arr = dataUrl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      return new File([u8arr], filename, { type: mime });
    };

    let story;

    VKStories.generateStoryFromTemplate(require(image), fields)
      .then(generatedStory => {
        story = generatedStory;
      })
      .catch(() => console.log("Failed to generate story"));

    VKConnect.send("VKWebAppCallAPIMethod", {
      method: "stories.getPhotoUploadServer",
      params: {
        access_token: this.state.token,
        add_to_news: "1",
        link_text: text,
        link_url: "https://vk.com/app" + this.state.appId,
        v: VK_API_VERSION
      }
    })
      .then(response => {
        const uploadUrl = response.data.response.upload_url;

        const request = new FormData();
        request.append("file", __makeFakeFile(story, "story.png"));

        console.log(uploadUrl, request);

        fetch(CORS_PROXY + uploadUrl, {
          method: "POST",
          body: request
        })
          .then(response => response.json())
          .then(response => console.log(response.response.story))
          .then(() => alert("История опубликована!"))
          .catch(() => alert("Что-то пошло не так, попробуйте еще раз :-("));
      })
      .catch(() => alert("Что-то пошло не так, попробуйте еще раз :-("));
    this.toggleModal();
  }

  handlePayButtonClick() {
    const receivingUserId = 7150594;
    console.log("i am here in handler");
    VKConnect.send("VKWebAppOpenPayForm", {
      app_id: this.state.appId,
      action: "pay-to-user",
      params: {
        amount: 100.0,
        description: "Payment for post",
        user_id: receivingUserId
      }
    })
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
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
            return (
              <FullPost
                {...props}
                shareToWallHandler={this.postToWall}
                addToStoryHandler={this.addToStory}
              />
            );
          }}
        />
        <Route
          path="/postBuy/:postId"
          exact
          render={props => {
            return (
              <PostBuy
                {...props}
                shareToWallHandler={this.postToWall}
                addToStoryHandler={this.addToStory}
                paymentHandler={this.handlePayButtonClick}
              />
            );
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
            <More id="more" {...props} groups={this.state.groups} />
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
          path="/register"
          render={props => (
            <GroupForm
              {...props}
              user={this.state.fetchedUser}
              groups={this.state.groups}
              id="group"
            />
          )}
        />
        <Route path="/" exact component={Feed}></Route>
      </div>
    );
  }
}

export default withRouter(App);
