import React from "react";
import { withRouter } from "react-router-dom";
import { Search } from "@vkontakte/vkui";
import "./Feed.css";
class Discover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="qqq">
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
        <Search className="search" theme="default" />
      </div>
    );
  }
}

export default withRouter(Discover);
