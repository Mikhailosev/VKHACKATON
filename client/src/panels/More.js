import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { Editor } from "@tinymce/tinymce-react";
import ContentEditor from "./ContentEditor.js";
import { ListItem, Group, Avatar, Spinner } from "@vkontakte/vkui";
class More extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let groups = [];

    if (this.props.groups) {
      groups = this.props.groups.items.map(res => {
        return (
          <div>
            <ListItem
              before={<Avatar src={res.photo_50} />}
              description={res.name}
            ></ListItem>
          </div>
        );
      });
    }

    return (
      <Panel id={this.props.id}>
        <PanelHeader>Панель управления</PanelHeader>
        <Group title="Администрируемые группы">{groups}</Group>
      </Panel>
    );
  }
}

export default More;
