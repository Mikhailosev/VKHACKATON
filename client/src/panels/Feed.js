import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { Button, Div, View, Group } from "@vkontakte/vkui";
import { graphql } from "react-apollo";
import { getPostsQuery } from "../queries/queries";
import { withRouter, Link } from "react-router-dom";
import logo from "../img/logo.png";
import photo from "../img/photo.jpg";
import "./Feed.css";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    let posts = [];
    if (this.props.data.posts) {
      console.log(this.props);

      posts = this.props.data.posts.map(res => (
        <Link
          to={`/post/` + res.id}
          key={res.id}
          style={{
            textDecoration: "none",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Div className="postplace">
            <img
              className="previewlogo"
              src={`https://arcane-savannah-41356.herokuapp.com/` + res.image}
            />
            <h1>{res.title}</h1>
            <h2>{res.teaser}</h2>
            <h4>{res.timetoread}</h4>
            {/* <div
            className="content"
            dangerouslySetInnerHTML={{ __html: res.content }}
          ></div> */}

            <img className="gray" />
            <img
              className="photo ph"
              src={`https://arcane-savannah-41356.herokuapp.com/` + res.image}
            />
          </Div>
        </Link>
      ));
      console.log(posts);
    }
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
        {posts}
      </div>
    );
  }
}

export default graphql(getPostsQuery)(Feed);
