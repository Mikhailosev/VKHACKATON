import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

class Favorites extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Panel id={this.props.id}>
                <PanelHeader>Избранное</PanelHeader>
            </Panel>
        )
    }

};

export default Favorites;