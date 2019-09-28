import React from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import logo from "../img/logo.png";
import photo from "../img/photo.jpg";
import "./Feed.css";

import Icon24Share from '@vkontakte/icons/dist/24/share';

const osName = platform();

const PostBuy = props => (
  <Panel id={props.id}>
    <PanelHeader
      left={
        <HeaderButton onClick={props.go} data-story="feed">
          {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
        </HeaderButton>
      }
    >
      <img className="centeravatarpost" src={logo} alt="Logo" />
    </PanelHeader>
    <div>
      <h1 className="titleopen">Как включить ПК</h1>
      <h2 className="groupdate">Alexeev Inc. • 32 дек в 24:01</h2>
      <img className="imagepost" src={photo} alt="Image" />
      <p className="posttext">
        В этой статье вы не узнаете ничего нового. Совсем ничего(
      </p>
        <Icon24Share onClick={props.toggleModal} />
    </div>
  </Panel>
);

PostBuy.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
};

export default PostBuy;
