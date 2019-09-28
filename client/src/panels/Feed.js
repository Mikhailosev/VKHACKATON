import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { Button, Div, View, Group } from "@vkontakte/vkui";
import logo from "../img/logo.png";
import photo from "../img/photo.jpg";
import "./Feed.css";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: "PostBuy"
    };
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>Лента</PanelHeader>
        <Div
          onClick={this.props.go}
          data-story="fullPost"
          style={{
            height: "auto",
            marginLeft: "2%",
            marginRight: "2%",
            marginTop: "2%",
            borderRadius: "30px 30px 30px 30px",
            position: "relative",
            boxSizing: "border-box",
            boxShadow: "0 0 5px #999999"
          }}
        >
          <img
            className="logo center"
            src={logo}
            alt="Logo"
            style={{
              height: "70px"
            }}
          />
          <h1>Обучающая статья по редактору Adobe Photoshop для чайников</h1>
          <h2>Alexeev Inc.</h2>
          <h3>1000 просмотров</h3>
          <h4>Время чтения: 30 минут</h4>
          <img className="gray" />
          <img className="photo ph" src={photo} />
        </Div>
      </Panel>
    );
  }
}

export default Feed;
