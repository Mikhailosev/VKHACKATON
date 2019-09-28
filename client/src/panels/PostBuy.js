import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { Div } from "@vkontakte/vkui";

class PostBuy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>Лента</PanelHeader>
        <Div>
          <p>123</p>
        </Div>
      </Panel>
    );
  }
}

export default PostBuy;
