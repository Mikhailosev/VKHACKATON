import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class ContentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null
        };
        this.handleEditorChange=this.handleEditorChange.bind(this);
    }

    sendDataToDB(p) {
        // do something with {p}
    }

    async handleEditorChange(e) {
        let content = await this.setState({content: [e.target.getContent()]});
        console.log('Content was updated:', e.target.getContent());
        console.log(this.state.content);
        this.sendDataToDB(content)
        return content;
    }

    render() {

        return(

            <form>
                <Editor
                    initialValue="<p>This is the initial content of the editor</p>"
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | image | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                    onChange={this.handleEditorChange}
                />
            </form>
        )
    }

}

export default ContentEditor;