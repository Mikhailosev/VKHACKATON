import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { Editor } from "@tinymce/tinymce-react";
import ContentEditor from "./ContentEditor.js";
import { ListItem, Group, Avatar, Spinner } from "@vkontakte/vkui";
class GroupView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let group = "";
    console.log(this.props);
    if (this.props.group) {
      group = () => {
        return this.props.group.name;
      };
    }

    return (
      <div>
        <Group title="Подписки">Я ГРУППААААА</Group>
        <Group title="Администрируемые группы">{group}</Group>
      </div>
    );
  }
}

export default GroupView;
