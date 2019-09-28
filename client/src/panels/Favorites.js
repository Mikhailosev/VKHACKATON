import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import logo from "../img/logo.png";
import photo from "../img/photo.jpg";
import "./Feed.css";
import { Button, Div, View, Group } from "@vkontakte/vkui";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>Ваша платная лента</PanelHeader>
        <Div
          onClick={this.props.go}
          data-story="fullPost"
          className="postplace"
        >
          <img className="previewlogo" src={logo} />
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

export default Favorites;
