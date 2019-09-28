import React from "react";
import { Panel, PanelHeader, Search } from "@vkontakte/vkui";

class Discover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>
          <Search theme="header" />

        </PanelHeader>
      </Panel>
    );
  }
}

export default Discover;
