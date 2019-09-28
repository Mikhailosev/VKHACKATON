import React from 'react';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import {Cell, List, Avatar, InfoRow, ModalPage, ModalPageHeader, HeaderButton, IS_PLATFORM_IOS} from "@vkontakte/vkui";
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';


class ShareButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleShare() {

    }

    render() {
        return(
            <Icon24ShareOutline onClick={this.handleShare}/>
        )
    }

}

export default ShareButton;