import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { Avatar } from "@vkontakte/vkui";
import { addGroupMutation } from "../queries/queries";

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      groupId: "",
      authorId: ""
    };
    this.onSelectChange = this.onSelectChange.bind(this);
  }
  displayGroups() {
    console.log(this.props);
    return this.props.groups.response.items.map(group => {
      return (
        <option value={group.id} key={group.id}>
          {group.name} {<Avatar src={group.photo_50}></Avatar>}
        </option>
      );
    });
  }
  onSelectChange(e) {
    this.setState({
      groupId: e.target.value.groupId,
      authorId: e.target.value.authorId,
      name: e.target.value.name
    });
    console.log(this.state);
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.addGroupMutation({
      variables: {
        groupId: this.state.groupId,
        authorId: this.state.authorId
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)} id="add-group">
        <div className="field">
          <label>Groups:</label>
          <select
            style={{
              boxShadow: "0 0 5px #999999",
              fontSize: "1.1rem",
              color: "black",
              width: "97%",
              height: "2rem",
              marginLeft: "1.25%",
              marginTop: "1%",
              marginBottom: "1%",
              boxSizing: "border-box",
              padding: "5px",
              paddingLeft: "10px",
              border: "1px solid lightgrey",
              borderRadius: "10px"
            }}
            onChange={e =>
              this.setState({
                groupId: e.target.value,
                authorId: this.props.user.id.toString()
              })
            }
          >
            <option>Select Group</option>
            {this.displayGroups()}
          </select>
        </div>
        <Link to="/more">
          <button
            style={{
              boxShadow: "0 0 5px #999999",
              fontSize: "1.1rem",
              color: "black",
              width: "97%",
              height: "2rem",
              marginLeft: "1.25%",
              marginTop: "1%",
              marginBottom: "1%",
              boxSizing: "border-box",
              padding: "5px",
              paddingLeft: "10px",
              border: "1px solid lightgrey",
              borderRadius: "10px"
            }}
          >
            +
          </button>
        </Link>
      </form>
    );
  }
}

export default compose(graphql(addGroupMutation, { name: "addGroupMutation" }))(
  GroupForm
);
