import React from 'react';
import { Panel, PanelHeader, Search } from '@vkontakte/vkui';

class Discover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: null
        }

        this.handleSearchChange=this.handleSearchChange.bind(this);
    }

    handleSearchChange(s, e) {
        // send request to db; s contain search string
        this.setState({
            searchResults: "response from backend on search string " + '"' + s + '"'
        })
    }

    render() {
        return(
            <Panel id={this.props.id}>
                <PanelHeader>
                    <Search theme="header" onChange={this.handleSearchChange} />
                </PanelHeader>
                {this.state.searchResults}
            </Panel>
        )
    }

}

export default Discover;