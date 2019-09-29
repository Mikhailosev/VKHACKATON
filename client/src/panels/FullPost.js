import React from "react";
import PropTypes from "prop-types";
import {platform, IOS, Group, PanelHeaderBack} from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import logo from "../img/logo.png";
import { graphql } from "react-apollo";
import {getPostFullQuery, getPostQuery} from "../queries/queries";
import photo from "../img/photo.jpg";
import "./Feed.css";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
      console.log(this.props);
      let title = "";
      let teaser = "";
      let content = "";
      let image = "";
      let buy = "";

      if (this.props.data.post) {
          title = this.props.data.post.title;
          teaser = this.props.data.post.teaser;
          content = this.props.data.post.content;
          image = this.props.data.post.image;
          buy = this.props.data.post.buy;
      }
      // const title = this.props.data.post.title;
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
        >
            <PanelHeaderBack
                onClick={() => this.props.history.goBack()}
                style={{color: "white", marginLeft: "3px"}}
            />
        </div>

          <h1 style={{
              textAlign: "center",
              color: "black"
          }}>
              {title}
          </h1>

          <br></br>

          <label>Тизер</label>
          <Group>
          <Div>
              {teaser}
          </Div>
          </Group>

          <label>Пост</label>
          <Group>
          <Div>
              <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: content }}
              ></div>
          </Div>
          </Group>

              <Group>
          <Div>
              {buy ? "Неоплаченный пост" : "Оплаченный пост"}
          </Div>
              </Group>
      </div>
    );
  }
}

export default graphql(getPostFullQuery, {
  options: props => {
    console.log(props);
    return {
      variables: {
        id: props.match.params.postId
      }
    };
  }
})(FullPost);
