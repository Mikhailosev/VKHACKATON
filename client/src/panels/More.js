import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { Editor } from "@tinymce/tinymce-react";
import { withRouter, Link } from "react-router-dom";
import ContentEditor from "./ContentEditor.js";
import {ListItem, Group, Avatar, Spinner, PanelHeaderBack} from "@vkontakte/vkui";
class More extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {/*<Group title="Подписки">*/}
        {/*  {" "}*/}
        {/*  <Link*/}
        {/*    to={`/register`}*/}
        {/*    style={{*/}
        {/*      textDecoration: "none",*/}
        {/*      marginLeft: "5%",*/}
        {/*      marginRight: "5%"*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <ListItem>Зарегистрироваться</ListItem>*/}
        {/*  </Link>*/}
        {/*</Group>*/}
          <div
              style={{
                  position: "fixed",
                  display: "flex",
                  top: "0",
                  left: "0",
                  height: "50px",
                  backgroundColor: "#4680c2",
                  width: "100%",
                  zIndex: "100"
              }}
          >
              {/*<PanelHeaderBack*/}
              {/*    onClick={() => this.props.history.goBack()}*/}
              {/*    style={{color: "white", marginLeft: "3px"}}*/}
              {/*/>*/}
          </div>
          <h1 style={{
              textAlign: "center",
              color: "black",
              marginTop: "60px"
          }}>
              Редактор
          </h1>
        <ContentEditor></ContentEditor>
      </div>
    );
  }
}

export default withRouter(More);
