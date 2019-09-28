import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "./ContentEditor.css";
import FormData from "form-data";

class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
      teaser: "",
      buy: "",
      selectedFile: null
    };
    this.fileInput = React.createRef();
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  changeTitle = event => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "postImage",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("title", this.state.title);
    axios.post("http://localhost:5000/postAdd", formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });
  };
  changeTeaser = event => {
    this.setState({ teaser: event.target.value });
    console.log(this.state.teaser);
  };
  changeBuy = event => {
    this.setState({ buy: event.target.value });
    console.log(this.state.buy);
  };
  sendDataToDB(p) {
    // do something with {p}
  }

  async handleEditorChange(e) {
    let content = await this.setState({ content: [e.target.getContent()] });
    console.log("Content was updated:", e.target.getContent());
    console.log(this.state.content);
    this.sendDataToDB(content);
    return content;
  }

  render() {
    return (
      <div>
        <form
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
          id="postForm"
        >
          <input
            type="text"
            placeholder="Введите заголовок"
            onChange={this.changeTitle}
          />
          <textarea
            type="text"
            placeholder="Введите демо текст статьи"
            onChange={this.changeTeaser}
          />
          <select value={true} onChange={this.changeBuy}>
            <option disabled>Выберите героя</option>
            <option value={true}>Платный</option>
            <option value={false}>Бесплатный</option>
          </select>
          <input type="file" onChange={this.fileChangedHandler} />>
          <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount"
              ],
              toolbar:
                "undo redo | formatselect | image | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help"
            }}
            onChange={this.handleEditorChange}
          />
          <button onClick={this.uploadHandler}>Загрузить пост</button>
        </form>
        {this.state.content ? (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: this.state.content }}
          ></div>
        ) : null}
      </div>
    );
  }
}

export default ContentEditor;
