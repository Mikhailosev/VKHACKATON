import React from "react";
import { withRouter } from "react-router-dom";
import { Search, Div, InfoRow, Progress, Group } from "@vkontakte/vkui";
import "./Feed.css";
import persik from "../img/persik.png";
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
        <Group className="al achieve">Достижения</Group>
        <Group>
          <Div>
            <img className="persik img1" src={persik} />
            <InfoRow className="img2" title="Добавь в избранное 10 записей">
              <Progress value={70} />
            </InfoRow>
            <InfoRow className="" title="Добавь в избранное 10 записей">
              <Progress value={70} />
            </InfoRow>
          </Div>
        </Group>
      </div>
    );
  }
}

export default withRouter(Discover);
