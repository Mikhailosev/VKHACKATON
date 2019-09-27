import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { Editor } from '@tinymce/tinymce-react';
import ContentEditor from "./ContentEditor.js";

class More extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        // this.state = {
        //     content: null
        // };
        // this.handleEditorChange=this.handleEditorChange.bind(this);
        // this.handleEditorSave=this.handleEditorSave.bind(this);
    }
    //
    //
    // renderGroupsList = (items) => {
    //     let groups = null;
    //     if (items !== undefined && items !== null && items.length !== 0) {
    //         groups = items.map((group) => (
    //             <GroupCell
    //                 key={group.id}
    //                 description={group.description}
    //                 photo={group.photo_100}
    //                 name={group.name}/>
    //
    //         ));
    //     }
    //     return groups;
    // };
    // async handleEditorChange(e) {
    //     let content = await this.setState({content: [e.target.getContent()]});
    //     console.log('Content was updated:', e.target.getContent());
    //     console.log(this.state.content)
    //     // this.setState({content: e.target.getContent()});
    //     return content;
    // }
    //
    // handleEditorSave(e) {
    //     this.setState({content: [e.target.getContent()]});
    //     console.log(this.state.content)
    // }

    render() {

        return(
            <Panel id={this.props.id}>
                <PanelHeader>Настройки</PanelHeader>
                <ContentEditor/>
                {/*<form>*/}
                {/*    /!*<Editor*!/*/}
                {/*    /!*    initialValue={null}*!/*/}
                {/*    /!*    init={{ plugins: 'link image code',*!/*/}
                {/*    /!*        toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'}}*!/*/}
                {/*    /!*    onChange={this.handleEditorChange}/>*!/*/}
                {/*    <Editor*/}
                {/*        initialValue="<p>This is the initial content of the editor</p>"*/}
                {/*        init={{*/}
                {/*            height: 300,*/}
                {/*            menubar: false,*/}
                {/*            plugins: [*/}
                {/*                'advlist autolink lists link image charmap print preview anchor',*/}
                {/*                'searchreplace visualblocks code fullscreen',*/}
                {/*                'insertdatetime media table paste code help wordcount'*/}
                {/*            ],*/}
                {/*            toolbar:*/}
                {/*                'undo redo | formatselect | image | bold italic backcolor | \*/}
                {/*                alignleft aligncenter alignright alignjustify | \*/}
                {/*                bullist numlist outdent indent | removeformat | help'*/}
                {/*        }}*/}
                {/*        onChange={this.handleEditorChange}*/}
                {/*    />*/}
                {/*</form>*/}
                {/*{*/}
                {/*    this.state.content ?*/}
                {/*        <div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>*/}
                {/*        :null*/}
                {/*}*/}
            </Panel>
        )
    }

};

export default More;