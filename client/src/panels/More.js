import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { Editor } from "@tinymce/tinymce-react";
import { withRouter, Link } from "react-router-dom";
import ContentEditor from "./ContentEditor.js";
import { ListItem, Group, Avatar, Spinner } from "@vkontakte/vkui";
class More extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Group title="Подписки">
          {" "}
          <Link
            to={`/registerGroup/:userId`}
            style={{
              textDecoration: "none",
              marginLeft: "5%",
              marginRight: "5%"
            }}
          >
            <ListItem>Зарегистрироваться</ListItem>
          </Link>
        </Group>
        <ContentEditor></ContentEditor>
      </div>
    );
  }
}

export default withRouter(More);
