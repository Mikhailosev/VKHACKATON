import React from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import logo from "../img/logo.png";
import { graphql } from "react-apollo";
import { getPostQuery } from "../queries/queries";
import photo from "../img/photo.jpg";
import "./Feed.css";

<<<<<<< HEAD
class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div
          style={{
            display: "block",
            width: "100%",
            top: "0",
            left: "0",
            height: "50px",
            backgroundColor: "#4680c2",
            opacity: "1"
          }}
        ></div>
      </div>
    );
  }
}
=======
import Icon24Share from '@vkontakte/icons/dist/24/share';

const osName = platform();
>>>>>>> 2d1419dcab2a10c5865ed1115cb6492fce4404cc

export default graphql(getPostQuery, {
  options: props => {
    console.log(props);
    return {
      variables: {
        id: props.match.params.postId
      }
<<<<<<< HEAD
    };
  }
})(FullPost);
=======
    >
      <img className="centeravatarpost" src={logo} alt="Logo" />
    </PanelHeader>
    <div>
      <h1 className="titleopen">Как включить ПК</h1>
      <h2 className="groupdate">Alexeev Inc. • 32 дек в 24:01</h2>
      <p className="posttext">
        Для начала купите книгу "Персональный компьютер для чайников", затем
        прочитайте её и выбросьте свой ПК на мусорку.
      </p>
      <img className="imagepost" src={photo} alt="Image" />
      <p className="posttext">
        Кто прочитал тот гей! Падашел аташол понял принял!
      </p>
      <img className="imagepost" src={photo} alt="Image" />
      <p className="posttext">Вот и сказочке канец... </p>
        <Icon24Share onClick={props.toggleModal} />
    </div>
  </Panel>
);

FullPost.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
};

export default FullPost;
>>>>>>> 2d1419dcab2a10c5865ed1115cb6492fce4404cc
